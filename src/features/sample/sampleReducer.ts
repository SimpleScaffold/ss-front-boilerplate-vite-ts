import axios from "axios";
import { reduxMaker} from "src/app/store/redux/reduxUtils.ts";
import {RootState} from "src/app/store/redux/reduxStore.tsx";

const prefix = 'sample'




const asyncRequests = [
    {
        action: 'getPokemon',
        state: 'pokemon',
        initialState: {} ,
        api: () => axios.get('https://pokeapi.co/api/v2/pokemon/ditto'),
    },

    {
        action: 'getPokemon',
        state: 'pokemon',
        initialState: {} ,
        api: (param) => axios.post('https://test.com', param),
    },
]


const localState = {
    value: 0,
}


const localReducers = {
    decrement: (state) => {
        state.value -= 1
    },
}

export const { sampleSlice,sampleSaga, sampleAction } = reduxMaker(
    prefix,
    asyncRequests,
    localState,
    localReducers,
)
