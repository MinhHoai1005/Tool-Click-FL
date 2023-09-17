/* eslint-disable require-yield */

import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, fork, put, take } from "redux-saga/effects";
import { authAction, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
    try {
        localStorage.setItem('access_token', 'token')
        yield put(authAction.loginSuccess({
            id:"",
            email: "string",
            username: "string",
            phone: "string",
        }))
        yield put(push('/admin'))
    } catch (error) {
        yield put(authAction.loginFailed('error'));
    }


}
function* handleLogout() {
    localStorage.removeItem('access_token');
    yield put(push('/login'))

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