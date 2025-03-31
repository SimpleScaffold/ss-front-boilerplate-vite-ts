import { createSlice } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'

//백엔드 에서 보내줄때는 statusCode, data, errMsg ?

//프런트에서 쓰기 위해 보여주는 값들
export const reducerUtils = {
    init: (defaultType = null) => ({
        data: defaultType,
        loading: false,
        error: false,
        errorMsg: '',
    }),

    loading: (prevData = null) => ({
        data: prevData,
        loading: true,
        error: false,
        errorMsg: '',
    }),

    success: (data = null) => ({
        data: data,
        loading: false,
        error: false,
        errorMsg: '',
    }),

    error: (prevData = null, errorMsg) => ({
        data: prevData,
        loading: false,
        error: true,
        errorMsg: errorMsg,
    }),
}

//비동기 요청에서 state 만 추출
const makeAsyncRequestState = (requests) => {
    return requests.reduce((acc, { state, initialState }) => {
        acc[state] = reducerUtils.init(initialState)
        return acc
    }, {})
}

// 비동기 요청의 시작 리듀서
const asyncReducers = (prefix, asyncRequest) => {
    const reducers = {}

    asyncRequest.forEach(({ action, state: stateKey }) => {
        reducers[action] = (state, action) => ({
            ...state,
            [stateKey]: reducerUtils.loading(state[stateKey]?.data),
        })
    })

    return reducers
}

// 로딩이 시작되면 자동으로 실행, 비동기 처리를 해줌
const createRequestSaga = (prefix, reducerName, apiRequest) => {
    return function* fetchApiData(action) {
        try {
            // api 호출 시도
            const response = yield call(() => apiRequest(action.payload))

            //결과에 따른 분기처리
            const result = response.data

            // HTTP 상태 코드별 에러 처리
            if (response.status >= 400) {
                let errorMessage = '요청 처리 중 오류가 발생했습니다.'
                switch (response.status) {
                    case 400:
                        errorMessage = '잘못된 요청입니다.'
                        break
                    case 401:
                        errorMessage = '인증 오류 발생: 로그인 해주세요.'
                        break
                    case 403:
                        errorMessage = '접근이 거부되었습니다.'
                        break
                    case 404:
                        errorMessage = '요청한 리소스를 찾을 수 없습니다.'
                        break
                    case 500:
                        errorMessage = '서버 오류가 발생했습니다.'
                        break
                    case 503:
                        errorMessage = '서버가 현재 사용할 수 없습니다.'
                        break
                    default:
                        errorMessage = response.data?.message || errorMessage
                        break
                }
                yield put({
                    type: `${prefix}/${reducerName}Fail`,
                    payload: errorMessage,
                })
                return
            }

            // todo 파일 다운로드 처리 추가 (형태에 따라 + 실패시)

            // 정상 통신일떄
            yield put({
                type: `${prefix}/${reducerName}Success`,
                payload: result,
            })
        } catch (error) {
            //서버 자체의 오류 (ex) 서버가 죽음)
            yield put({
                type: `${prefix}/${reducerName}Fail`,
                payload: '서버에 문제가 있습니다. 관리자에게 문의하세요',
            })
        }
    }
}

// 비동기 처리 완료에 따른 상태 반영
export const extraReducers = (prefix, asyncRequest) => {
    return (builder) => {
        builder.addMatcher(
            (action) => action.type.includes(prefix),
            (state, action) => {

                const isSuccess = action.type.endsWith('Success')
                const isFail = action.type.endsWith('Fail')

                if (isSuccess || isFail) {
                    const key = action.type
                        .replace(new RegExp(`^${prefix}/`), '')
                        .replace(/(Success|Fail)$/, '')

                    // `asyncRequest` 배열에서 해당 action을 찾음
                    const requestInfo = asyncRequest.find(req => req.action === key)

                    if (requestInfo) {
                        const stateKey = requestInfo.state

                        state[stateKey] = isSuccess
                            ? reducerUtils.success(action.payload)
                            : reducerUtils.error(state[stateKey]?.data, action.payload)
                    }
                }
            }
        )
    }
}

// 최종 리덕스 제작기
export const reduxMaker = (
    prefix,
    asyncRequest = [],
    localState = {},
    localReducers = {},
) => {
    const final = {}
    const allInitialState = {
        ...localState,
        ...makeAsyncRequestState(asyncRequest),
    }

    final[`${prefix}Slice`] = createSlice({
        name: prefix,
        initialState: allInitialState,
        reducers: {
            initializeAll: () => {
                return allInitialState
            },
            initialize: (state, action) => {
                const itemName = action.payload
                if (
                    state[itemName] !== undefined &&
                    allInitialState[itemName] !== undefined
                ) {
                    state[itemName] = allInitialState[itemName]
                }
            },
            ...asyncReducers(prefix, asyncRequest),
            ...localReducers,
        },
        extraReducers: extraReducers(prefix, asyncRequest),
    })

    //사가 만들기 (제너레이터함수 사용)
    final[`${prefix}Saga`] = function* () {
        for (const { action, api } of asyncRequest) {
            yield takeLatest(
                `${prefix}/${action}`,
                createRequestSaga(prefix, action, api),
            )
        }
    }

    //액션 만들기
    final[`${prefix}Action`] = final[`${prefix}Slice`].actions

    return final
}
