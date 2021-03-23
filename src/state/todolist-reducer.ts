import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListActionType = {
    type:'ADD-TODOLIST'
    title:string
}

type ChangeTodoListTitle = {
    type:'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodoListFilter = {
    type:'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitle | ChangeTodoListFilter


export const todoListReducer = (todoLists:TodoListType[], action:ActionType) => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodoList: TodoListType = {id: newTodoListId, title:action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists
        }
        default:
            return todoLists
    }
}
export const RemoveTodoListAC = (id:string):RemoveTodoListActionType => {
    return {type:"REMOVE-TODOLIST", id:id }
}
export const AddTodoListAC = (title:string):AddTodoListActionType => {
    return {type:"ADD-TODOLIST", title:title}
}
export const ChangeTodoListAC = (title:string, id: string):ChangeTodoListTitle => {
    return {type:"CHANGE-TODOLIST-TITLE", title,id }
}
export const ChangeTodoListFilterAC = (id:string,filter: FilterValuesType):ChangeTodoListFilter => {
    return {type:"CHANGE-TODOLIST-FILTER", id, filter:filter }
}