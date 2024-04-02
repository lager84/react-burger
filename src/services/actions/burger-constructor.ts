import { v4 as uuid } from 'uuid';
import { TIngredients, TBurgerConstructor} from '../../utils/type';

export const SET_BUN:'SET_BUN' = "SET_BUN";
export const ADD_INGREDIENT:'ADD_INGREDIENT' = "ADD_INGREDIENT";
export const DELETE_INGREDIENT:'DELETE_INGREDIENT' = "DELETE_INGREDIENT";
export const SET_SUM:'SET_SUM' = "SET_SUM";
export const MOVE_INGREDIENTS:'MOVE_INGREDIENTS' = "MOVE_INGREDIENTS";
export const DELETE_INGREDIENT_ALL:'DELETE_INGREDIENT_ALL' = "DELETE_INGREDIENT_ALL";


export interface SetBunAction {
    type: typeof SET_BUN;
    item: TIngredients;
}

export interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    payload: TBurgerConstructor;
    
}

export interface DeleteIngredientAction {
    type: typeof DELETE_INGREDIENT;
    index: number;
}

export interface DeleteIngredientAllAction {
    type: typeof DELETE_INGREDIENT_ALL;
}
export interface MoveIngredientAction {
    type: typeof MOVE_INGREDIENTS;
    index1: number;
    index2: number;
}

export interface SetSumAction {
    type: typeof SET_SUM;
    sum: number;
}

export type TBurgerConstructorActions = SetBunAction | AddIngredientAction | DeleteIngredientAction | 
    MoveIngredientAction | SetSumAction | DeleteIngredientAllAction;


export const addIngridient = (item: TIngredients): AddIngredientAction =>{
    return {
        type: ADD_INGREDIENT,
        payload: {...item, uniqueId: uuid()}
    }
}