import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type:'ADD-TODOLIST'
    title:string
    todoListId:string
}

export type ChangeTodoListTitle = {
    type:'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoListFilter = {
    type:'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitle | ChangeTodoListFilter



export let todoListId1 = v1()
export let todoListId2 = v1()

let initialState: TodoListType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
]

export const todoListReducer = (todoLists:TodoListType[] = initialState, action:ActionType):TodoListType[] => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.todoListId, title:action.title, filter: "all"}
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
    return {type:"ADD-TODOLIST", title:title, todoListId: v1()}
}
export const ChangeTodoListAC = (title:string, id: string):ChangeTodoListTitle => {
    return {type:"CHANGE-TODOLIST-TITLE", title,id }
}
export const ChangeTodoListFilterAC = (id:string,filter: FilterValuesType):ChangeTodoListFilter => {
    return {type:"CHANGE-TODOLIST-FILTER", id, filter:filter }
}