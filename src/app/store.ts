import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from '../features/Auth/auth-reducer'
import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from "../features/Application";
import {todolistsReducer} from "../features/TodolistsList";

// объединяя reducer-ы с помощью combineReducers, задаём структуру единственного объекта-состояния
export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})


// непосредственно создаём store

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// для обращения к store через консоль
// @ts-ignore
window.store = store

