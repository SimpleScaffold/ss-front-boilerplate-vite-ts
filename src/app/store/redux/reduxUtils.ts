import { CaseReducerActions, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { RootState } from 'src/app/store/redux/reduxStore.tsx'
import { call, put, takeLatest } from 'redux-saga/effects'
import { AnyAction, SagaIterator } from 'redux-saga'


type AsyncState<DataType> = {
    data: DataType | null;
    loading: boolean;
    error: boolean;
    errorMsg: string;
};


//프런트에서 쓰기 위해 보여주는 값들
export const reducerUtils = {
    init: <DataType>(defaultType: DataType | null = null): AsyncState<DataType> => ({
        data: defaultType,
        loading: false,
        error: false,
        errorMsg: '',
    }),

    loading: <DataType>(prevData: DataType | null = null): AsyncState<DataType> => ({
        data: prevData,
        loading: true,
        error: false,
        errorMsg: '',
    }),

    success: <DataType>(data: DataType): AsyncState<DataType> => ({
        data: data,
        loading: false,
        error: false,
        errorMsg: '',
    }),

    error: <DataType>(prevData: DataType | null = null, errorMsg: string): AsyncState<DataType> => ({
        data: prevData,
        loading: false,
        error: true,
        errorMsg: errorMsg,
    }),
}

export interface AsyncRequest<DataType, PayloadType> {
    action: string;
    state: string;
    initialState: DataType;

    api(payload: PayloadType): Promise<AxiosResponse>;
}


//비동기 요청에서 state 만 추출
const makeAsyncRequestState = <T, U>(
    asyncRequests: readonly AsyncRequest<T, U>[] | [],
): Record<string, AsyncState<T>> => {
    return asyncRequests.reduce((acc, { state, initialState }) => {
        acc[state] = reducerUtils.init(initialState)
        return acc
    }, {} as Record<string, AsyncState<T>>)
}


const createRequestSaga = <PayloadType, ResponseType>(
    prefix: string,
    reducerName: string, api: (payload: PayloadType) => Promise<AxiosResponse<ResponseType>>,
) => {
    return function* fetchApiData(action: AnyAction) {
        try {
            // api 호출 시도
            const response: AxiosResponse = yield call(() => api(action.payload))

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


export function reduxMaker<
    LocalState,
    AsyncRequests extends readonly AsyncRequest<unknown, unknown>[] = []
>(
    prefix: string,
    asyncRequests: AsyncRequests | [],
    localState: LocalState,
    localReducers: SliceCaseReducers<LocalState>,
) {

    // state 생성 로컬 state + 비동기 state
    const asyncState = makeAsyncRequestState(asyncRequests)
    const allInitialState = {
        ...localState,
        ...asyncState,
    }

    //비동기 리듀서 생성
    const asyncReducers = asyncRequests.reduce((reducers, { action, state: stateKey }) => ({
        ...reducers,
        [action]: (state: typeof asyncState) => ({
            ...state,
            [stateKey]: reducerUtils.loading(state[stateKey]?.data),
        }),
    }), {})



    const slice = createSlice({
        name: prefix,
        initialState: allInitialState,
        reducers: {
            initializeAll: () => {
                return allInitialState
            },
            initialize: (state, action) => {
                const key = action.payload
                return {
                    ...state,
                    [key]: allInitialState[key as keyof typeof allInitialState],
                }
            },
            ...localReducers,
            ...asyncReducers,
        },
    }) as Slice

    const saga = function* () {
        for (const { action, api } of asyncRequests) {
            yield takeLatest(
                `${prefix}/${action}`,
                createRequestSaga(prefix, action, api),
            )
        }
    } as (() => SagaIterator)

    console.log(saga)

    return {
        slice,
        actions: slice.actions,
        saga, // 명확하게 saga 포함
    } as const
}