import * as actions from '../services/actions/tabs-info'
import { tabsInfoReducer, initialState }  from "../services/reducers/tabs-info";
import { SAUCE } from '../utils/ingrediebtsName';


describe('tab-info reducer', () => {
    it("should return the initial state", () => {
        expect(tabsInfoReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle SET_TAB", () => {
        expect(tabsInfoReducer(initialState, { type: actions.SET_TAB, tab: SAUCE }))
            .toEqual({ ...initialState, tab: SAUCE });
    });


});

