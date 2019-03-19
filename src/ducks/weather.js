import { KEY, BASE_URL, WEATHER } from '../common/constants';
// Actions
const GET_WEATHER = 'ducks/weather/GET_WEATHER';
const GET_WEATHER_SUCCESS = 'ducks/weather/GET_WEATHER_SUCCESS';
const GET_WEATHER_FAILURE = 'ducks/weather/GET_WEATHER_FAILURE';

// Reducer
export default function reducer(state = { loading: false, error: null, data: null }, action = {}) {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                loading: true
            };
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case GET_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
}

// Action Creators
export function getWeatherStart() {
    return { type: GET_WEATHER };
}

export function getWeatherSuccess(data) {
    return { type: GET_WEATHER_SUCCESS, payload: data };
}

export function getWeatherFailure(error) {
    return { type: GET_WEATHER_FAILURE, payload: error };
}

export function getWeather(country, state, city) {
    return async dispatch => {
        dispatch(getWeatherStart());
        const params = [`city=${city}`, `state=${state}`, `country=${country}`, `key=${KEY}`].join(
            '&'
        );
        try {
            let response = await fetch(`${BASE_URL}${WEATHER}?${params}`);
            let json = await response.json();
            dispatch(getWeatherSuccess(json.data));
        } catch (error) {
            dispatch(getWeatherFailure());
        }
    };
}
