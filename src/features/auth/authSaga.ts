/* eslint-disable require-yield */

import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, put, take } from "redux-saga/effects";
import { authAction, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
    try {
        localStorage.setItem('access_token', 'token')
        yield put(authAction.loginSuccess({
            id: 1,
            email: "string",
            username: "string",
            phone: "string",
        }))
    } catch (error) {
        yield put(authAction.loginFailed('error'));
    }


}
function* handleLogout() {
    localStorage.removeItem('access_token');

}

function* watchLoginFlow() {
    while (true) {
        const isLoginIn = Boolean(localStorage.getItem('access_token'))
        if (!isLoginIn) {
            const action: PayloadAction<LoginPayload> = yield take(authAction.login.type);
            yield fork(handleLogin, action.payload);
        }

        yield take(authAction.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {

    yield fork(watchLoginFlow);
}