import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []


const slice = createSlice({
    name:'todoList',
    initialState:initialState,
    reducers: {
        changeTodolistTitleAC (state, action:PayloadAction<{id: string, title: string}>) {
            const index =  state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        removeTodolistAC  (state, action:PayloadAction<{id: string}>) {
            const index =  state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index,1)
            }
        },
        addTodolistAC (state, action:PayloadAction<{todoList: TodolistType}>) {
            state.push({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistFilterAC (state, action:PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index =  state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC (state, action:PayloadAction<{id: string, status: RequestStatusType}>) {
            state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.status} : tl)
        },
        setTodolistsAC (state, action:PayloadAction<{todoList: Array<TodolistType>}>) {
          return   action.payload.todoList.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
    }
})

 export const todolistsReducer = slice.reducer
 export const {changeTodolistTitleAC,removeTodolistAC, addTodolistAC,changeTodolistFilterAC,changeTodolistEntityStatusAC, setTodolistsAC} = slice.actions


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({value:'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todoList: res.data}))
                dispatch(setAppStatusAC({value:'succeeded'}))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(setAppStatusAC({value:'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(changeTodolistEntityStatusAC( {status: 'loading',id:todolistId}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id:todolistId}))
                //скажем глобально приложению, что асинхронная операция завершена
                dispatch(setAppStatusAC({value:'succeeded'}))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({value:'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({todoList:res.data.data.item}))
                dispatch(setAppStatusAC({value:'succeeded'}))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id, title}))
            })
    }
}

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

