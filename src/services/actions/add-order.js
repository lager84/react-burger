import { postOrder } from '../../utils/order-api';

export const ADD_ORDER_START = "ADD_ORDER_START";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_ERROR = "ADD_ORDER_ERROR";
export const CLEAR_ORDER = "CLEAR_ORDER";

export function addOrder(ingredients) {
    return function (dispatch) {
        dispatch({ type: ADD_ORDER_START });
        postOrder(ingredients)
            .then(data => {
                dispatch({ type: ADD_ORDER_SUCCESS, orderNumber: data });
            })
            .catch(err => {
                dispatch({ type: ADD_ORDER_ERROR });
            });
    }
}