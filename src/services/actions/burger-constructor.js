import { v4 as uuid } from 'uuid';
export const SET_BUN = "SET_BUN";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SET_SUM = "SET_SUM";
export const MOVE_INGREDIENTS = "MOVE_INGREDIENTS";
export const DELETE_INGREDIENT_ALL = "DELETE_INGREDIENT_ALL";


export const addIngridient = (item) => {
    return {
        type: ADD_INGREDIENT,
        payload: {...item, uniqueId: uuid()}
    }
}