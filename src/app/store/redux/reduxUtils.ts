import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { RootState } from 'src/app/store/redux/reduxStore.tsx'

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
    asyncRequests: readonly AsyncRequest<T, U>[],
): Record<string, AsyncState<T>> => {
    return asyncRequests.reduce((acc, { state, initialState }) => {
        acc[state] = reducerUtils.init(initialState)
        return acc
    }, {} as Record<string, AsyncState<T>>)
}


export function reduxMaker<
    LocalState,
    AsyncRequests extends readonly AsyncRequest<unknown, unknown>[]
>(
    prefix: string,
    asyncRequests: AsyncRequests,
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
            initialize: (state, action ) => {
                const key = action.payload;
                return {
                    ...state,
                    [key]: allInitialState[key as keyof typeof allInitialState]
                };
            },
            ...localReducers,
            ...asyncReducers,
        },
    })

    return {
        [`${prefix}Slice`]: slice,
        [`${prefix}Action`]: slice.actions,
    }
}