import { getIngredients } from '../../utils/api'
import { AppDispatch, TIngredients } from '../../utils/type';


export const GET_DATA:"GET_DATA" = "GET_DATA";
export const GET_FEED_SUCCESS:"GET_FEED_SUCCESS" = "GET_FEED_SUCCESS";
export const GET_FEED_FAILED:"GET_FEED_FAILED" = "GET_FEED_FAILED";

export interface ILoadDataStartAction {
    type: typeof GET_DATA;
}

export interface ILoadDataSuccessAction {
    type: typeof GET_FEED_SUCCESS;
    data: Array<TIngredients>;
}

export interface ILoadDataErrorAction {
    type: typeof GET_FEED_FAILED;
}

export type TLoadIngredientsActions = ILoadDataStartAction | ILoadDataSuccessAction | ILoadDataErrorAction;

export function loadApiIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: GET_DATA });
        getIngredients()
            .then(data => {
                dispatch({ type: GET_FEED_SUCCESS, data: data.data });
            })
            .catch(error => {
                dispatch({ type: GET_FEED_FAILED, });
            });
    }
}
