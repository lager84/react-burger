import { RootState } from "../utils/type"

export const getData = (state:RootState) => state.loadApiIngredients;
export const getBun = (state:RootState) => state.burgerConstructor?.bun;
export const getConstructorIngredients = (state:RootState) => state.burgerConstructor?.ingredients;
export const getConstructorIngredientsSum = (state:RootState) => state.burgerConstructor?.sum;
export const getOrder = (state:RootState) => state.addOrder;
export const numberGetOrder = (state:RootState) => state.numberGetOrder;
export const getOrdersAll = (state: RootState) => state.ordersAll;
export const getDispIngedients = (state:RootState) => state.dispIngredient?.dispIngredient;
export const getTabsInfo = (state:RootState) => state.tabsInfo;
export const getAuth = (state:RootState) => state.auth;
export const getOrdersUser = (state: RootState) => state.ordersUser;
