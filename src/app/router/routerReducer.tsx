import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'
import {PayloadAction} from "@reduxjs/toolkit";

const prefix = 'router'

const asyncRequests = [
    {}
]

const localState = {
    location: {
        path: window.location.pathname || null,
        state: window.history.state?.usr || null,
    },
}

const localReducers = {
    locationChange: (state, action) => {
        return {
            ...state,
            location: action.payload,
        }
    },
}

export const { routerSlice, routerSaga, routerAction } = reduxMaker(
    prefix,
    asyncRequests,
    localState,
    localReducers,
)
