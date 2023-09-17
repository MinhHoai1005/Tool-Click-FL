import { Reducer } from "redux"
import { AuthState, AuthActionTypes } from "./types"
import { get } from "lodash"
// Type-safe initialState!
const initialState: AuthState = {
    loading: true,
    isAuthenticated: false,
    user: null,
    permission: {
        update_config_currency: false,
    },
}

export const getUser = (state) => JSON.parse(JSON.stringify(get(state, "user", {})))

export const authReducer: Reducer<AuthState> = (state = initialState, { type, payload }) => {
    switch (type) {
        case AuthActionTypes.CHANGE_PERMISSION:
            return { ...state, permission: { ...state.permission, ...payload } }
        case AuthActionTypes.SET_USER_INFO:
            return { ...state, user: payload }
        case AuthActionTypes.SET_AUTHENTICATION:
            return { ...state, isAuthenticated: payload }
        case AuthActionTypes.CHANGE_LOADING:
            return { ...state, loading: payload }
        default:
            return state
    }
}
