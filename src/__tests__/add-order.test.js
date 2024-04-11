import * as actions from '../services/actions/add-order'
import { addOrderReducer, initialState }  from "../services/reducers/add-order";

const errorMessage = 'error message';


describe('add-order reducer', () => {
    
    it("should return the initial state", () => {
        expect(addOrderReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle ADD_ORDER_START", () => {
        expect(addOrderReducer(initialState, { type: actions.ADD_ORDER_START }))
            .toEqual({ ...initialState, orderLoad: true, orderLoadErrors: false });
    });
    it("should handle ADD_ORDER_SUCCESS", () => {
        const orderNumber = 1234;
        expect(addOrderReducer(initialState, { type: actions.ADD_ORDER_SUCCESS, orderNumber: orderNumber }))
            .toEqual({ ...initialState, orderLoad: false, orderLoadErrors: false, orderNumber: orderNumber });
    });
    it("should handle ADD_ORDER_ERROR", () => {
        expect(addOrderReducer(initialState, { type: actions.ADD_ORDER_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, orderLoad: false, orderLoadErrors: true, orderNumber: null });
    });
    it("should handle CLEAR_ORDER", () => {
        expect(addOrderReducer(initialState, { type: actions.CLEAR_ORDER}))
            .toEqual(initialState);
    });
});