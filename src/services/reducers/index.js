import { combineReducers } from 'redux';
import { loadApiIngredientsReducer } from './load-api-ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { dispIngredientReducer } from './disp-ingredients'
import { addOrderReducer } from './add-order'
import { tabsInfoReducer } from './tabs-info';

export default combineReducers({
  loadApiIngredients: loadApiIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  dispIngredient: dispIngredientReducer,
  addOrder: addOrderReducer,
  tabsInfo: tabsInfoReducer
});