import createSagaMiddleware from 'redux-saga'
import { configureStore, Tuple } from '@reduxjs/toolkit'
import { all } from 'redux-saga/effects'
import {routerSaga, routerSlice} from "src/app/router/routerReducer.tsx";

const reducers = {
    routerReducer: routerSlice.reducer,


}

export function* rootSaga() {
    yield all([
        routerSaga(),
    ])
}


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', //보여지는지 여부
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


sagaMiddleware.run(rootSaga)
export default store
