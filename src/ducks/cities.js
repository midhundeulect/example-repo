import { KEY, BASE_URL, CITIES } from '../common/constants';
//ACTIONS
const GET_CITIES = 'ducks/cities/GET_CITIES';
const GET_CITIES_SUCCESS = 'ducks/cities/GET_CITIES_SUCCESS';
const GET_CITIES_FAILURE = 'ducks/cities/GET_CITIES_FAILURE';
//REDUCER
export default function reducer(state = { loading: false, error: null, cities: [] }, action = {}) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                loading: true
            };
        case GET_CITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                cities: action.payload
            };
        case GET_CITIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                cities : []
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
export function getCities(country,state) {
    //console.log("GET CITIESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
    return async dispatch => {
        console.log("GET CITIESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
        dispatch(getCitiesStart());
        const params = [`state=${state}`,`country=${country}`,`key=${KEY}`].join('&');
        console.log(params)
        try {
            let response = await fetch(`${BASE_URL}${CITIES}?${params}`);
            console.log(`${BASE_URL}${CITIES}?${params}`)
            let json = await response.json();
            dispatch(getCitiesSuccess(json.data));
        } catch (error) {
            dispatch(getCitiesFailure());
        }
    };
}
