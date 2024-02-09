import {
    ADD_ORDER_START,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_ERROR,
    CLEAR_ORDER
} from '../actions/add-order';

const initialState = {
    orderLoad: false,
    orderLoadErrors: false,
    orderNumber: null
}

export function addOrderReducer(state = initialState, action) {
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