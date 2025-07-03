import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'

const prefix = 'theme'

const asyncRequests = [] as const

const localState = {
    colors: {} as Record<string, string>,
}

const localReducers = {
    setColors: (
        state: typeof localState,
        action: PayloadAction<Record<string, string>>,
    ) => {
        state.colors = action.payload
    },
    setColor: (
        state: typeof localState,
        action: PayloadAction<{ key: string; value: string }>,
    ) => {
        state.colors[action.payload.key] = action.payload.value
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const {
    slice: themeSlice,
    actions: themeAction,
    saga: themeSaga,
} = module
