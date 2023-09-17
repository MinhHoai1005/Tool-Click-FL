import { combineReducers } from "redux"
import { authReducer } from "./Auth/reducer"
import { connectRouter } from 'connected-react-router';
import reduxReducers from "./redux/reduxSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
    router: connectRouter(history),
    redux: reduxReducers,
})
