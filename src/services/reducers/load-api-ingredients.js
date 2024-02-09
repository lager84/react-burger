import { GET_DATA, GET_FEED_SUCCESS, GET_FEED_FAILED } from '../actions/load-api-ingredients'

const initialState = {
    data: [],
    loadData: false,
    errorData: false
}

export function loadApiIngredientsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA:
            return { ...state, loadData: true, errorData: false };
        case GET_FEED_SUCCESS:
            return { ...state, loadData: false, errorData: false, data: action.data };
        case GET_FEED_FAILED:
            return { ...state, loadData: false, errorData: true, data: initialState.data };

        default:
            return state;
    }
}