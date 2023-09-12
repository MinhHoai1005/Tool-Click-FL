import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models";

export interface LoginPayload {
    email: string,
    password: string,
}

export interface AuthState {
    isLoginIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

const initialState: AuthState = {
    isLoginIn: false,
    logging: false,
    currentUser: undefined,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.isLoginIn = true;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },

        logout(state) {
            state.isLoginIn = false;
            state.currentUser = undefined
        },
    }
})

// Action
export const authAction = authSlice.actions;


// Selectors
export const selectorsIsLoginIn = (state: any) => state.auth.isLoginIn;
export const selectorsIsLogin = (state: any) => state.auth.logging;
// Reducers
const authReducers = authSlice.reducer;
export default authReducers;