/**
 * Main store function
 */
 import { createStore, applyMiddleware, compose, Store } from "redux"
 import createSagaMiddleware from "redux-saga"
 import { composeWithDevTools } from "redux-devtools-extension"
 import { StateReducer, rootReducer } from "./root-reducer"
 import rootSagas from "./root-sagas"
 
 export function configureStore() {
     // Middleware and store enhancers
     const sagaMiddleware = createSagaMiddleware()
 
     let middleware = applyMiddleware(sagaMiddleware)
 
     let env = process.env.NODE_ENV
 
     if (env !== "production") {
         let devToolsExtension = window["devToolsExtension"]
         if (typeof devToolsExtension === "function") {
             middleware = compose(middleware, devToolsExtension())
         } else {
             middleware = compose(middleware, composeWithDevTools())
         }
     }
 
     const store: Store<StateReducer> = createStore(rootReducer, middleware)
 
     sagaMiddleware.run(rootSagas)
 
     return store
 }
 