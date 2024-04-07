import {TBurgerConstructor } from '../../utils/type';
import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_SUM,
    MOVE_INGREDIENTS,
    DELETE_INGREDIENT_ALL,
    TBurgerConstructorActions
} from '../actions/burger-constructor';

export type TBurgerConstructorState = {
    bun: TBurgerConstructor | null;
    ingredients: Array<TBurgerConstructor>;
    sum: number;
}

const initialState:TBurgerConstructorState = {
    bun: null,
    ingredients: [],
    sum: 0
}

export function burgerConstructorReducer(state = initialState, action:TBurgerConstructorActions): TBurgerConstructorState {
    switch (action.type) {
        case SET_BUN:
            return { ...state, bun: action.item };
        case ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.payload] };
        case DELETE_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients].filter((_item, index) => index !== action.index) };
        case SET_SUM:
            return { ...state, sum: action.sum };
        case MOVE_INGREDIENTS:
            const newState = { ...state, ingredients: [...state.ingredients] };
            [newState.ingredients[action.index1], newState.ingredients[action.index2]] = [newState.ingredients[action.index2], newState.ingredients[action.index1]];
            return newState;
        case DELETE_INGREDIENT_ALL:
            return initialState
        default:
            return state;
    }
}