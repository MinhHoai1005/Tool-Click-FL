import { combineReducers } from "redux"
import { authReducer } from "./Auth/reducer"
import { AuthState } from "./Auth/types"

export interface StateReducer {
    auth: AuthState
}

export const rootReducer = combineReducers<StateReducer>({
    auth: authReducer,
})
