import { GET_DATA, GET_FEED_SUCCESS, GET_FEED_FAILED,  TLoadIngredientsActions } from '../actions/load-api-ingredients'
import { TIngredients } from '../../utils/type';


type TLoadIngredientsState = {
    loadData: boolean;
    errorData: boolean;
    data: {success:boolean , data:Array<TIngredients>};
}

const initialState:TLoadIngredientsState = {
    loadData: false,
    errorData: false,
    data: {success:false , data:[]}
}

export function loadApiIngredientsReducer(state = initialState, action: TLoadIngredientsActions):TLoadIngredientsState {
    switch (action.type) {
        case GET_DATA:
            return { ...state, loadData: true, errorData: false };
        case GET_FEED_SUCCESS:
            return { ...state, loadData: false, errorData: false, data:{success:true , data:action.data} };
        case GET_FEED_FAILED:
            return { ...state, loadData: false, errorData: true, data: initialState.data };

        default:
            return state;
    }
}