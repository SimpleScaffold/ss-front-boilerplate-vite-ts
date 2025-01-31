import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'
import {configureStore, Tuple} from "@reduxjs/toolkit";


const reducers = {}


export function* rootSaga() {
    yield all([])
}


const store = configureStore({
    reducer: reducers,
    middleware:  () => new Tuple(sagaMiddleware),
    // devTools: process.env.NODE_ENV !== 'production', 보여지는 여부
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


const sagaMiddleware = createSagaMiddleware()

sagaMiddleware.run(rootSaga)

export default store