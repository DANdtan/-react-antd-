import { createStore, combineReducers, applyMiddleware } from "redux"
import * as reducers from "../reducer/reducer";
import thunk from "redux-thunk"
//import { persistStore, autoRehydrate } from 'redux-persist'
//import { routerReducer } from 'react-router-redux'
var store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk),
   // autoRehydrate()
)
// persistStore(store, {
//     whitelist: ['TabList'],
//    // storage:  window.sessionStorage

// })
export default store

