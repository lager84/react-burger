export const getData = (state) => state.loadApiIngredients?.data;
export const getBun = (state) => state.burgerConstructor?.bun;
export const getConstructorIngredients = (state) => state.burgerConstructor?.ingredients;
export const getConstructorIngredientsSum = (state) => state.burgerConstructor?.sum;
export const getOrder = (state) => state.addOrder;
export const getDispIngedients = (state) => state.dispIngredient?.dispIngredient;
export const getTabsInfo = (state) => state.tabsInfo;
export const getAuth = (state) => state.auth;