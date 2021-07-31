import {combineReducers} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList";
import {appReducer} from "../features/Application";
import {authReducer} from "../features/Auth/auth-reducer";

// объединяя reducer-ы с помощью combineReducers, задаём структуру
// единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})