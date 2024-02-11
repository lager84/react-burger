import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SET_SUM,
    MOVE_INGREDIENTS,
    DELETE_INGREDIENT_ALL
} from '../actions/burger-constructor';


const initialState = {
    bun: null,
    ingredients: [],
    sum: 0
}

export function burgerConstructorReducer(state = initialState, action) {
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