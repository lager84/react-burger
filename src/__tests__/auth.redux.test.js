import * as actions from '../services/actions/auth'
import { authReducer, initialState }  from "../services/reducers/auth";


const errorMessage = 'error message';
const user = {
    name: 'kozlov',
    email: 'kozlov@live.ru'
}

describe('auth reducer', () => {
    it("should return the initial state", () => {
        expect(authReducer(undefined, {}))
            .toEqual(initialState);
    });

    it("should handle AUTH_LOGIN_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_LOGIN_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_LOGIN_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_LOGIN_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true  });
    });
    it("should handle AUTH_LOGIN_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_LOGIN_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false});
    });

    it("should handle AUTH_REGISTER_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_REGISTER_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_REGISTER_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_REGISTER_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true});
    });
    it("should handle AUTH_REGISTER_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_REGISTER_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false });
    });
    
    it("should handle AUTH_LOGOUT_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_LOGOUT_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_LOGOUT_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_LOGOUT_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: false, user: null });
    });
    it("should handle AUTH_LOGOUT_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_LOGOUT_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false});
    });

    it("should handle AUTH_FORGOT_PASSWORD_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_FORGOT_PASSWORD_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false, forgotPassword: false });
    });
    it("should handle AUTH_FORGOT_PASSWORD_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_FORGOT_PASSWORD_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, forgotPassword: true });
    });
    it("should handle AUTH_FORGOT_PASSWORD_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_FORGOT_PASSWORD_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, forgotPassword: false });
    });
    it("should handle AUTH_RESET_PASSWORD_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_RESET_PASSWORD_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_RESET_PASSWORD_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_RESET_PASSWORD_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true });
    });
    it("should handle AUTH_RESET_PASSWORD_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_RESET_PASSWORD_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false });
    });

    it("should handle AUTH_TOKEN_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_TOKEN_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_TOKEN_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_TOKEN_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true });
    });
    it("should handle AUTH_TOKEN_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_TOKEN_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: null });
    });
    it("should handle AUTH_GET_USER_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_GET_USER_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_GET_USER_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_GET_USER_SUCCESS, user: user }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true, userLoggedIn: true, user: user });
    });
    it("should handle AUTH_GET_USER_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_GET_USER_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false, userLoggedIn: false, user: null });
    });
    it("should handle AUTH_PATCH_USER_START", () => {
        expect(authReducer(initialState, { type: actions.AUTH_PATCH_USER_START }))
            .toEqual({ ...initialState, requestStart: true, requestError: null, requestSuccess: false });
    });
    it("should handle AUTH_PATCH_USER_SUCCESS", () => {
        expect(authReducer(initialState, { type: actions.AUTH_PATCH_USER_SUCCESS }))
            .toEqual({ ...initialState, requestStart: false, requestError: null, requestSuccess: true });
    });
    it("should handle AUTH_PATCH_USER_ERROR", () => {
        expect(authReducer(initialState, { type: actions.AUTH_PATCH_USER_ERROR, message: errorMessage }))
            .toEqual({ ...initialState, requestStart: false, requestError: errorMessage, requestSuccess: false });
    });

})