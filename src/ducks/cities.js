import { KEY, BASE_URL, CITIES } from '../common/constants';
//ACTIONS
const GET_CITIES = 'ducks/cities/GET_CITIES';
const GET_CITIES_SUCCESS = 'ducks/cities/GET_CITIES_SUCCESS';
const GET_CITIES_FAILURE = 'ducks/cities/GET_CITIES_FAILURE';
//REDUCER
export default function reducer(state = { loading: false, error: null, cities: {} }, action = {}) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                loading: true
            };
        case GET_CITIES_SUCCESS:
            let newCities = state.cities;
            newCities[action.payload.country] = {};
            newCities[action.payload.country][action.payload.state] = action.payload.cities;
            return {
                ...state,
                loading: false,
                cities: newCities
            };
        case GET_CITIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                cities: []
            };
        default:
            return state;
    }
}
//ACTION CREATOR
export function getCitiesStart() {
    return {
        type: GET_CITIES
    };
}
export function getCitiesSuccess(data) {
    return {
        type: GET_CITIES_SUCCESS,
        payload: data
    };
}
export function getCitiesFailure(error) {
    return {
        type: GET_CITIES_FAILURE,
        payload: error
    };
}
//Side Effects
export function getCities(country, state) {
    return async dispatch => {
        dispatch(getCitiesStart());
        const params = [`state=${state}`, `country=${country}`, `key=${KEY}`].join('&');
        try {
            let response = await fetch(`${BASE_URL}${CITIES}?${params}`);
            let json = await response.json();
            if (json.data.message) {
                dispatch(getCitiesFailure());
            } else {
                dispatch(getCitiesSuccess({ country: country, state: state, cities: json.data }));
            }
        } catch (error) {
            dispatch(getCitiesFailure());
        }
    };
}
