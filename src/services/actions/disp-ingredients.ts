import { TIngredients } from '../../utils/type';

export const SET_DISP_INGREDIENT:'SET_DISP_INGREDIENT' = "SET_DISP_INGREDIENT";

export interface SetDisplayedIngredientAction {
    type: typeof SET_DISP_INGREDIENT;
    item: TIngredients | null;
}

export type TIngredientWindowActions = SetDisplayedIngredientAction;