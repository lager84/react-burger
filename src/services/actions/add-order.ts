import { postOrder } from '../../utils/api';
import { AppDispatch, TBurgerConstructor } from '../../utils/type';

export const ADD_ORDER_START:'ADD_ORDER_START' = "ADD_ORDER_START";
export const ADD_ORDER_SUCCESS:'ADD_ORDER_SUCCESS' = "ADD_ORDER_SUCCESS";
export const ADD_ORDER_ERROR:'ADD_ORDER_ERROR' = "ADD_ORDER_ERROR";
export const CLEAR_ORDER:'CLEAR_ORDER' = "CLEAR_ORDER";


export interface IAddOrderStartAction {
    type: typeof ADD_ORDER_START;
}

export interface IAddOrderSuccessAction {
    type: typeof ADD_ORDER_SUCCESS;
    orderNumber: number;
}

export interface IAddOrderErrorAction {
    type: typeof ADD_ORDER_ERROR;
}

export interface IClearOrderAction {
    type: typeof CLEAR_ORDER;
}

export type TCreateOrderActions = IAddOrderStartAction | IAddOrderSuccessAction | IAddOrderErrorAction |
    IClearOrderAction;

export function addOrder(ingredients:Array<TBurgerConstructor>) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: ADD_ORDER_START });
        postOrder(ingredients)
            .then(data => {
                dispatch({ type: ADD_ORDER_SUCCESS, orderNumber:data.order.number });
            })
            .catch(err => {
                dispatch({ type: ADD_ORDER_ERROR });
            });
    }
}
