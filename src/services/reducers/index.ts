import { combineReducers } from 'redux';
import { loadApiIngredientsReducer } from './load-api-ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { dispIngredientReducer } from './disp-ingredients'
import { addOrderReducer } from './add-order'
import { tabsInfoReducer } from './tabs-info';
import { authReducer } from './auth';
import { getOrderReducer } from './get-order';
import { ordersAllReducer } from './orders-all';
import { ordersUserReducer } from './orders-user';

export default combineReducers({
  loadApiIngredients: loadApiIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  dispIngredient: dispIngredientReducer,
  addOrder: addOrderReducer,
  tabsInfo: tabsInfoReducer,
  auth: authReducer,
  numberGetOrder: getOrderReducer,
  ordersAll: ordersAllReducer,
  ordersUser: ordersUserReducer
});

