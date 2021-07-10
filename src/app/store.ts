import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {authReducer} from '../features/Login/auth-reducer'
import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import {useMemo} from "react";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

type AppDispatchType = typeof store.dispatch
export const AppDispatch = () => useDispatch<AppDispatchType>()

export function useAction<T extends ActionCreatorsMapObject<any>>(action:T){
    const dispatch = AppDispatch()

    //bindActionCreators связывает санку\экшн и с дипатчем, позволяя сократить код: dispatch(action(value)) -> action(value)
    //useMemo сохраняет вычесленные значения функции
    const boundAction = useMemo(() => {
          return bindActionCreators(action,dispatch)
    },[])

    return boundAction
}