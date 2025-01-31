// import { reducerUtils } from '@/app/store/reduxUtils.tsx'
//
import { RootState } from '@/app/store/reduxStore.tsx'

const prefix = 'sample'
//
// const state = {
//     data: 'yet',
// }
//
// const asyncRequest = [
//     {
//         action: 'login',
//         stateName: 'accessToken',
//         api: login,
//     },]
// //
//
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//
import { ReducerState, reducerUtils } from '@/app/store/reduxUtils.tsx'

const getAPI = () => {}





//기본**************************************************************************

const initialState = {
    sampleData: 0,
}

//대충 사가 로직

const localReducers = [
    {
        action: 'setdata',
        targetState: 'data',
    },
]

const asyncReducers = [
    {
        action: '',
        targetState: '',
        api: () => {},
    },

]






