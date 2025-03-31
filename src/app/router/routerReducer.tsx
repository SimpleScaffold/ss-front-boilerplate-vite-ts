import { reduxMaker } from 'src/app/store/redux/reduxUtils.jsx'

const prefix = 'router'

const asyncRequest = []

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
    asyncRequest,
    localState,
    localReducers,
)
