import { BASE_URL } from './domain'
import { request } from './request'
import { setCookie, getCookie } from "./cookie";

const API_LOGIN = "/auth/login";
const API_LOGOUT = "/auth/logout";
const API_TOKEN = "/auth/token";
const API_USER = "/auth/user";
const API_REGISTER = "/auth/register";
const API_FORGOT_PASSWORD = "/password-reset";
const API_RESET_PASSWORD = "/password-reset/reset";


export function refreshToken() {
    return request(`${BASE_URL}${API_TOKEN}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken")
        })
    });
}

function requestWithRefreshToken(url, options) {
    return request(url, options)
        .catch(err => {
            if (err.message === "jwt expired") {
                return refreshToken().then(refreshData => {
                    if (!refreshData.success) {
                        return Promise.reject(refreshData);
                    }
                    localStorage.setItem("refreshToken", refreshData.refreshToken);
                    setCookie("accessToken", refreshData.accessToken);
                    options.headers.authorization = refreshData.accessToken;
                    return request(url, options);
                });
            } else {
                return Promise.reject(err);
            }
        });
}

export function registerUser(user) {
    return request(`${BASE_URL}${API_REGISTER}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...user })
    });
}

export function loginUser(user) {
    return request(`${BASE_URL}${API_LOGIN}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...user })
    });
}


export function logoutUser() {
    return request(`${BASE_URL}${API_LOGOUT}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token: localStorage.getItem("refreshToken") })
    });
}

export function forgotPassword(form) {
    return request(`${BASE_URL}${API_FORGOT_PASSWORD}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...form })
    });
}

export function resetPassword(form) {
    return request(`${BASE_URL}${API_RESET_PASSWORD}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ...form })
    });
}

export function getUser() {
    return requestWithRefreshToken(`${BASE_URL}${API_USER}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        }
    });
}

export function patchUser(user) {
    return requestWithRefreshToken(`${BASE_URL}${API_USER}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: "Bearer " + getCookie("accessToken")
        },
        body: JSON.stringify({ ...user })
    });
}