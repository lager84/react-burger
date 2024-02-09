import { SET_TAB } from '../actions/tabs-info';
import { BUN } from '../../utils/ingrediebtsName';

const initialState = {
    tab: BUN
}

export function tabsInfoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}