import { KEY, BASE_URL, COUNTRIES } from '../common/constants';

//Actions
const GET_COUNTRIES = 'ducks/countryDuck/GET_COUNTRIES';
const GET_COUNTRIES_SUCCESS = 'ducks/countryDuck/GET_COUNTRIES_SUCCESS';
const GET_COUNTRIES_FAILURE = 'ducks/countryDuck/GET_COUNTRIES_FAILURE';

//Reducer
export default function reducer(state = { loading: false, error: null, countries: [] }, action = {}) {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                loading: true
            };
        case GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                countries: action.payload
            };
        case GET_COUNTRIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                countries: []
            };
        default:
            return state;
    }
}

//Action Creators
export function getCountriesStart() {
    return {
        type: GET_COUNTRIES
    };
}
export function getCountriesSuccess(data) {
    return {
        type: GET_COUNTRIES_SUCCESS,
        payload: data
    };
}
export function getCountriesFailure(error) {
    return {
        type: GET_COUNTRIES_FAILURE,
        payload: error
    };
}

//Side effects
export function getCountries() {
    console.log("*************************")
    return async dispatch => {
        dispatch(getCountriesStart());
        const params = [`key=${KEY}`].join('&');
        console.log(`${BASE_URL}${COUNTRIES}?${params}`);
        try {
            let response = await fetch(`${BASE_URL}${COUNTRIES}?${params}`);
            let json = await response.json();
            console.log(json);
            dispatch(getCountriesSuccess(json.data));
        } catch (error) {
            console.log(error);
            dispatch(getCountriesFailure());
        }
    };
}
