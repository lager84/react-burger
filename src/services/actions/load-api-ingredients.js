import { getIngredients } from '../../utils/burger-api'


export const GET_DATA = "GET_DATA";
export const GET_FEED_SUCCESS = "GET_FEED_SUCCESS";
export const GET_FEED_FAILED = "GET_FEED_FAILED";

export function loadApiIngredients() {
    return function (dispatch) {
        dispatch({ type: GET_DATA });
        getIngredients()
            .then(data => {
                dispatch({ type: GET_FEED_SUCCESS, data: data });
            })
            .catch(error => {
                dispatch({ type: GET_FEED_FAILED, });
            });
    }
}
