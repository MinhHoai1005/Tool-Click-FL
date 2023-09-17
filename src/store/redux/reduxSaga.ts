import { Middleware } from "@reduxjs/toolkit";
import { BrowserHistory } from "history";
import { reduxAction } from "./reduxSlice";

type ReduxAction<T = any> = {
    type: string,
    payload?: T,
};

export const routerMiddleware = (history: BrowserHistory): Middleware => () => (
    next,
) => (action: ReduxAction) => {
    switch (action.type) {
        case reduxAction.push.type: {
            history.push(action.payload);
            return next(action);
        }
        default:
            return next(action);
    }
};
