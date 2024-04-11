import * as actions from '../services/actions/burger-constructor'
import { burgerConstructorReducer, initialState }  from "../services/reducers/burger-constructor";

const ingredient = {
    "_id":"60666c42cc7b410027a1a9b5",
       "name":"Говяжий метеорит (отбивная)",
       "type":"main",
       "proteins":800,
       "fat":800,
       "carbohydrates":300,
       "calories":2674,
       "price":3000,
       "image":"https://code.s3.yandex.net/react/code/meat-04.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
       "__v":0
};

describe('burger-constructor reducer', () => {
    
    it("should return the initial state", () => {
        expect(burgerConstructorReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle SET_BUN", () => {
        expect(burgerConstructorReducer(initialState, { type: actions.SET_BUN, item: ingredient }))
            .toEqual({ ...initialState, bun: ingredient });
    });

    it("should handle ADD_INGREDIENT", () => {
        expect(burgerConstructorReducer(initialState, { type: actions.ADD_INGREDIENT, payload: ingredient }))
            .toEqual({ ...initialState, ingredients: [ingredient] });
    });
    
    it("should handle DELETE_INGREDIENT", () => {
        expect(burgerConstructorReducer({ ...initialState, ingredients: [ingredient]}, { type: actions.DELETE_INGREDIENT, index: 0 }))
            .toEqual({ ...initialState, ingredients: [] });
    });

    it("should handle SET_SUM", () => {
        let sum = 1000;
        expect(burgerConstructorReducer(initialState, { type: actions.SET_SUM, sum: sum }))
            .toEqual({ ...initialState, sum: sum });
    });
    
    it("should handle MOVE_INGREDIENTS", () => {
        let ingredient2 = { ...ingredient, name: "abc" };
        expect(burgerConstructorReducer({ ...initialState, ingredients: [ingredient, ingredient2]}, { type: actions.MOVE_INGREDIENTS, index1: 0, index2: 1 }))
            .toEqual({ ...initialState, ingredients: [ingredient2, ingredient]});
    });
    

    it("should handle DELETE_INGREDIENT_ALL", () => {
        expect(burgerConstructorReducer(initialState, { type: actions.DELETE_INGREDIENT_ALL}))
            .toEqual(initialState);
    });




});