import React, { useReducer } from 'react';
import {  Update, History } from 'history';
import { Router } from 'react-router-dom';


export interface BrowserRouterProps {
    children?: React.ReactNode;
    window?: Window;
    history: History;
}

export function BrowserRouter({ children, history }: BrowserRouterProps) {
    const [state, dispatch] = useReducer((_: Update, action: Update) => action, {
        action: history.action,
        location: history.location,
    });

    React.useLayoutEffect(() => history.listen(dispatch), [history]);

    return (
        <Router
            location={state.location}
            navigator={history}
        >
            {children}
        </Router>
    );
}