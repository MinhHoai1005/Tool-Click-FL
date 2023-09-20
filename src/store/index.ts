/**
 * Main store function
 */
 import createSagaMiddleware from "redux-saga"
 import { routerMiddleware } from 'connected-react-router';
 import { rootReducer } from "./root-reducer"
 import { configureStore } from '@reduxjs/toolkit';
 import { history } from 'utils';
 import rootSaga from './root-sagas';

 const sagaMiddleware = createSagaMiddleware()
 export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
 });
 
 sagaMiddleware.run(rootSaga)
 