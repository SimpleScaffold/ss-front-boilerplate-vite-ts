import axios from "axios";
import {reduxMaker} from "src/app/store/redux/reduxUtils.ts";

const prefix = 'sample'


const asyncRequests = [
    {
        action: 'getPokemon',
        state: 'pokemon',
        initialState: {} as
            {
                name: string;
                id: number;
            },
        api: () => axios.get('https://pokeapi.co/api/v2/pokemon/ditto'),
    },

    {
        action: 'getTest',
        state: 'test',
        initialState: [] as { success: boolean; message: string }[], // Inline type definition for TestData[]
        api: (param: { param1: string; param2: number }) => axios.post('https://test.com', param), // Inline type definition for TestPayload
    },
]


const localState = {
    value: 0,
}


const localReducers = {
    decrement: (state: typeof localState) => {
        state.value -= 1
    },
}

export const {sampleSlice, sampleSaga, sampleAction} = reduxMaker(
    prefix,
    asyncRequests,
    localState,
    localReducers,
)
