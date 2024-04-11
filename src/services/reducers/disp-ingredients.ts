import { TIngredients } from '../../utils/type';
import { SET_DISP_INGREDIENT , TIngredientWindowActions } from '../actions/disp-ingredients';


type TIngredientDispState = {
    dispIngredient: TIngredients | null;
}

export const initialState:TIngredientDispState = {
    dispIngredient: null
}

export function dispIngredientReducer(state = initialState, action:TIngredientWindowActions):TIngredientDispState {
    switch (action.type) {
        case SET_DISP_INGREDIENT:
            return { ...state, dispIngredient: action.item };
        default:
            return state;
    }
}