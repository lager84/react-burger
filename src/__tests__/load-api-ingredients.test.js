import * as actions from '../services/actions/load-api-ingredients'
import { loadApiIngredientsReducer, initialState }  from "../services/reducers/load-api-ingredients";


const errorMessage = 'error message';

const data = { success:true [
    {
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
    },
    {
        "_id":"60666c42cc7b410027a1a9b9",
        "name":"Соус традиционный галактический",
        "type":"sauce",
        "proteins":42,
        "fat":24,
        "carbohydrates":42,
        "calories":99,
        "price":15,
        "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
        "__v":0
    }
]} ;

describe('load-api-ingredients reducer', () => {
    
    it("should return the initial state", () => {
        expect(loadApiIngredientsReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle GET_DATA", () => {
        expect(loadApiIngredientsReducer(initialState, { type: actions.GET_DATA }))
            .toEqual({ ...initialState, loadData: true, errorData: false });
    });
    it("should handle GET_FEED_SUCCESS", () => {
        expect(loadApiIngredientsReducer(initialState, { type: actions.GET_FEED_SUCCESS, data: data }))
            .toEqual({ ...initialState, loadData: false, errorData: false, data:{success:true , data} });
    });
    it("should handle GET_FEED_FAILED", () => {
        expect(loadApiIngredientsReducer(initialState, { type: actions.GET_FEED_FAILED, message: errorMessage }))
            .toEqual({ ...initialState, loadData: false, errorData: true, data:{success:false , data:[] }});
    });

})
