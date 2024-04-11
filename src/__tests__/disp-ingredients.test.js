import * as actions from '../services/actions/disp-ingredients'
import { dispIngredientReducer, initialState }  from "../services/reducers/disp-ingredients";

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

describe('disp-ingredients reducer', () => {
    
    it("should return the initial state", () => {
        expect(dispIngredientReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle SET_DISP_INGREDIENT", () => {
        expect(dispIngredientReducer(initialState, { type: actions.SET_DISP_INGREDIENT , item: ingredient }))
            .toEqual({ ...initialState, dispIngredient: ingredient});
    });

});