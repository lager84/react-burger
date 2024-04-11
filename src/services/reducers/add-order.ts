import {
    ADD_ORDER_START,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_ERROR,
    CLEAR_ORDER,
    TCreateOrderActions
} from '../actions/add-order';

type TAddOrderState = {
    orderLoad: boolean;
    orderLoadErrors: boolean;
    orderNumber: number | null;
}

export const initialState:TAddOrderState  = {
    orderLoad: false,
    orderLoadErrors: false,
    orderNumber: null
}

export function addOrderReducer(state = initialState, action:TCreateOrderActions): TAddOrderState {
    switch (action.type) {
        case ADD_ORDER_START:
            return { ...state, orderLoad: true, orderLoadErrors: false };
        case ADD_ORDER_SUCCESS:
            return { ...state, orderLoad: false, orderLoadErrors: false, orderNumber: action.orderNumber };
        case ADD_ORDER_ERROR:
            return { ...state, orderLoad: false, orderLoadErrors: true, orderNumber: initialState.orderNumber };
        case CLEAR_ORDER:
            return initialState;

        default:
            return state;
    }
}