import store from "../services/store";
import { TAuthActions } from "../services/actions/auth";
import { TBurgerConstructorActions } from "../services/actions/burger-constructor";
import { TCreateOrderActions } from "../services/actions/add-order";
import { TGetOrderActions } from "../services/actions/get-order";
import { TIngredientWindowActions } from "../services/actions/disp-ingredients";
import { TLoadIngredientsActions } from "../services/actions/load-api-ingredients";
import { TTabInfoActions } from "../services/actions/tabs-info";
import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TOrdersAllActions, TwsOrdersAllActions } from "../services/actions/orders-all";
import { TOrdersUserActions, TwsOrdersUserActions } from "../services/actions/orders-user";
import rootReducer from '../services/reducers';


export type TIngredients = {
  calories: number;
  carbohydrates: number;
  price: number;
  proteins: number;
  type: string;
  _id: string;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  __v: number;
};


export type TBurgerConstructor = TIngredients & {
  uniqueId: string;
};

export type TIngredientQty = TIngredients & {
  qty: number;
}


export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export type TOrdersList = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}



export type RootState = ReturnType<typeof rootReducer>;

export type TDispatch = typeof store.dispatch;

export type TApplicationActions = TAuthActions | TBurgerConstructorActions | TCreateOrderActions |
TIngredientWindowActions | TLoadIngredientsActions | TTabInfoActions | TGetOrderActions | TOrdersAllActions | TOrdersUserActions;


export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;

export type wsActionsTypes = TwsOrdersAllActions | TwsOrdersUserActions;
