import createSagaMiddleware from 'redux-saga'
import { configureStore, Tuple } from '@reduxjs/toolkit'
import { all } from 'redux-saga/effects'
import {sampleSaga, sampleSlice} from "src/features/sample/sampleReducer.jsx";
import {routerSaga, routerSlice} from "src/app/router/routerReducer.tsx";

const reducers = {
    routerReducer: routerSlice.reducer,

    sampleReducer: sampleSlice.reducer,

}

export function* rootSaga() {
    yield all([
        routerSaga(), sampleSaga(),
    ])
}


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', //보여지는지 여부
})

sagaMiddleware.run(rootSaga)
export default store
