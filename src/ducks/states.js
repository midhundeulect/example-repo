import { BASE_URL, STATES, KEY } from '../common/constants';
//Actions
const GET_STATES = 'ducks/states/GET_STATES';
const GET_STATES_SUCCESS = 'ducks/states/GET_STATES_SUCCESS';
const GET_STATES_FAILURE = 'ducks/states/GET_STATES_FAILURE';
//Reducer
export default function reducer(state = { loading: false, error: null, states: {} }, action = {}) {
    switch (action.type) {
        case GET_STATES:
            return {
                ...state,
                loading: true
            };
        case GET_STATES_SUCCESS:
            let newStates = state.states;
            newStates[action.payload.country] = action.payload.states;
            return {
                ...state,
                loading: false,
                states: newStates
            };
        case GET_STATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                states: []
            };
        default:
            return state;
    }
}
//Action Creator
export function getStatesStart() {
    return {
        type: GET_STATES
    };
}
export function getStatesSuccess(data) {
    return {
        type: GET_STATES_SUCCESS,
        payload: data
    };
}
export function getStatesFailure(error) {
    return {
        type: GET_STATES_FAILURE,
        payload: error
    };
}
//Side Effects
export function getStates(country) {
    return async dispatch => {
        dispatch(getStatesStart());
        const params = [`country=${country}`, `key=${KEY}`].join('&');
        try {
            let response = await fetch(`${BASE_URL}${STATES}?${params}`);
            let json = await response.json();
            if (json.data.message) {
                dispatch(getStatesFailure());
            } else {
                dispatch(getStatesSuccess({ country: country, states: json.data }));
            }
        } catch (error) {
            dispatch(getStatesFailure());
        }
    };
}
