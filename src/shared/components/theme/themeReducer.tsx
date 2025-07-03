import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'
import { colorGroups } from 'src/shared/components/theme/colorConstants.tsx'

const prefix = 'theme'

const asyncRequests = [] as const

const localState = {
    colors: {} as Record<string, string>,
}

const localReducers = {
    setColors: (
        state: typeof localState,
    ) => {
        const styles = getComputedStyle(document.documentElement)
        const result: Record<string, string> = {}
        for (const group of colorGroups) {
            for (const key of group.keys) {
                result[key] = styles.getPropertyValue(key).trim()
            }
        }
        state.colors = result
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
