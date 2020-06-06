import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunkMiddleware from "redux-thunk"
import {userReducer} from './user-reducer'
import {postsReducer} from "./posts-reducer";

let reducers = combineReducers({
    usersPage: userReducer,
    postsPage: postsReducer
});

type ReducersType = typeof reducers
export type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsType<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesType<T>>
export type AppStateType = ReturnType<ReducersType>
const store = createStore(reducers, compose(
    applyMiddleware(thunkMiddleware),
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

// @ts-ignore
window.store = store;

export default store;