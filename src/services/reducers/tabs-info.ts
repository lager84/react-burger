import { SET_TAB, TTabInfoActions  } from '../actions/tabs-info';
import { BUN } from '../../utils/ingrediebtsName';


type TTabInfoState = {
    tab: string;
}
export const initialState:TTabInfoState = {
    tab: BUN
}

export function tabsInfoReducer(state = initialState, action:TTabInfoActions ):TTabInfoState {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}