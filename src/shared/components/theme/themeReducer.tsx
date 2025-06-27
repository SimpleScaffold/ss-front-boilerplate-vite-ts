import {  reduxMaker } from 'src/app/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'

const prefix = 'theme'


const asyncRequests = [

] as const


const localState = {
    colors: {},
}


const localReducers = {
    setColors: (state: typeof localState, action: PayloadAction<Record<string, string>>) => {
        state.colors = action.payload
    }

}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const { slice: themeSlice, actions: themeAction, saga: themeSaga } = module