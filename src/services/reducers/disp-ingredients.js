import { SET_DISP_INGREDIENT } from '../actions/disp-ingredients';

const initialState = {
    dispIngredient: null
}

export function dispIngredientReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DISP_INGREDIENT:
            return { ...state, dispIngredient: action.item };
        default:
            return state;
    }
}