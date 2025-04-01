import axios from "axios";
import {reduxMaker} from "src/app/store/redux/reduxUtils.tsx";

const prefix = 'sample'


const asyncRequest = [

    {
        action: 'getPokemon',
        state: 'pokemon',
        initialState: {},
        api: () => axios.get('https://pokeapi.co/api/v2/pokemon/ditto'),
    },
]


const localState = {
    value: 0,
}


const localReducers = {
    // decrement: (state) => {
    //     state.value -= 1
    // },
}

export const { sampleSlice,sampleSaga, sampleAction } = reduxMaker(
    prefix,
    asyncRequest,
    localState,
    localReducers,
)
