import { BASE_URL } from "./domain";
import { setCookie, getCookie } from "./cookie";
import { TBurgerConstructor, TOrder} from "./type";

const API_LOGIN = "/auth/login";
const API_LOGOUT = "/auth/logout";
const API_TOKEN = "/auth/token";
const API_USER = "/auth/user";
const API_REGISTER = "/auth/register";
const API_FORGOT_PASSWORD = "/password-reset";
const API_RESET_PASSWORD = "/password-reset/reset";
export const WS_URL = "wss://norma.nomoreparties.space";

const request = <T>(url: string, options?: RequestInit) => {
  return fetch(url, options).then(checkResponse<T>);
};

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

type TServerResponse<T> = {
  success?: boolean;
} & T;

type TIngredientsResponse = TServerResponse<{
  data: TBurgerConstructor[];
}>;

type TOrderResponse = TServerResponse<{
  order: {number:number};
}>;

export function getIngredients() {
  return request<TIngredientsResponse>(`${BASE_URL}/ingredients`);
}

export function postOrder(ingredients: Array<TBurgerConstructor>) {
  // TODO вот тут у тебя неправильный тип стоит, эндпоинт этот не возвращает ингредиенты
  return request<TOrderResponse>(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ ingredients: ingredients.map((item) => item._id) }),
  });
}

export function orderGet(orderNum?: string) {
  return request<TOrder>(`${BASE_URL}/orders/${orderNum}`);
}

export function refreshToken() {
  return request<TRefrashToken>(`${BASE_URL}${API_TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
}

type TRefrashToken = TServerResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export const  requestWithRefreshToken = <T>(url: string, options: any) => {
   return request<T>(url, options)
  .catch((err) => {
    if (err.message === "jwt expired") {
      return refreshToken()
      .then((refreshData) => {
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        setCookie("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        return request<T>(url, options);
      });
    } else {
      return Promise.reject(err);
    }
  });
}

export type TRegisterUser = TServerResponse<{
  name: string;
  email: string;
  password: string;

}> & TRefrashToken;

export function registerUser(user: TRegisterUser) {
  return request<TRegisterUser>(`${BASE_URL}${API_REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
}

export type TLoginUser = TServerResponse<{
  name: string
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}>;



export function loginUser(user: TLoginUser) {
  return request<TLoginUser>(`${BASE_URL}${API_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...user }),
  });
}

type TLogoutUser = TServerResponse<{
  message: string;
}>;

export function logoutUser() {
  return request<TLogoutUser>(`${BASE_URL}${API_LOGOUT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
}

export type TForgotPassword = TServerResponse<{
  email: string;
}>;

export function forgotPassword(form: TForgotPassword) {
  return request<TForgotPassword>(`${BASE_URL}${API_FORGOT_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
}

export type TResetPassword = TServerResponse<{
  password: string;
  token: string;
}>;

export function resetPassword(form: TResetPassword) {
  return request<TResetPassword>(`${BASE_URL}${API_RESET_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...form }),
  });
}

// TODO тут и ниже нужно передать тип, который вернет getUser. Сейчас он ничего не возвращает и естественно нечего из него доставать.
// вот так return requestWithRefreshToken<Type> я показывал это на вебинаре

export function getUser() {
  return requestWithRefreshToken<TLoginUser>(`${BASE_URL}${API_USER}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
}

export type TPatchUser = TServerResponse<{
  name: string;
  email: string;
  password: string;
}>;

export function patchUser(user: TPatchUser) {
  return requestWithRefreshToken<TLoginUser>(`${BASE_URL}${API_USER}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({ ...user }),
  });
}
