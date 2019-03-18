// Actions
const WEATHER_START = 'ducks/weatherDuck/WEATHER_START';
const WEATHER_SUCCESS = 'ducks/weatherDuck/WEATHER_SUCCESS';
const WEATHER_FAILURE = 'ducks/weatherDuck/WEATHER_FAILURE';

// Reducer
export default function reducer(state = { loading: false, error: null, weather }, action = {}) {
    switch (action.type) {
        case WEATHER_START:
            return {
                ...state,
                loading: true
            };
        case WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                weather: action.payload
            };
        case WEATHER_FAILURE:
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
export function weatherStart() {
    return { type: WEATHER_START };
}

export function weatherSuccess(data) {
    return { type: WEATHER_SUCCESS, payload: data };
}

export function weatherFailure(error) {
    return { type: WEATHER_FAILURE, payload: error };
}

export function weather() {
    return async dispatch => {
        dispatch(weatherStart());
        try {
            let response = await fetch(
                'http://api.airvisual.com/v2/city?city=Thiruvananthapuram&state=Kerala&country=India&key=mFj4GgfDiqy8Auzrj'
            );
            let json = await response.json();
            dispatch(weatherSuccess(json.data));
        } catch (error) {
            dispatch(weatherFailure());
        }
    };
}
