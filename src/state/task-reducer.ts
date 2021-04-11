import {TaskStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, todoListId1, todoListId2} from "./todolist-reducer";


type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId:string
    todoListId:string
}
type AddTaskActionType = {
    type:"ADD-TASK"
    title:string
    todoListId:string
}
type ChangeTaskStatusActionType = {
    type:"CHANGE-TASK-STATUS"
    taskId:string
    todoListId:string
    isDone:boolean
}
type ChangeTaskTitleActionType = {
    type:"CHANGE-TASK-TITLE"
    taskId:string
    todoListId:string
    title:string
}


export type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeTaskStatusActionType |
    ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType

let initialState:TaskStateType = {
    [todoListId1]: [
        {id: v1(), title: 'js', isDone: false},
        {id: v1(), title: 'react', isDone: true},
        {id: v1(), title: 'typescript', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'milk', isDone: false},
        {id: v1(), title: 'bread', isDone: true},
        {id: v1(), title: 'potato', isDone: false},
    ],}

export const taskReducer = (state:TaskStateType = initialState, action:ActionType):TaskStateType => {
    switch (action.type){

        case "REMOVE-TASK": {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            let copyState = {...state}
            copyState[action.todoListId] = [newTask, ...copyState[action.todoListId]]
            return copyState

        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANGE-TASK-TITLE": {

             let copyState = {...state}
             const task = copyState[action.todoListId].find(t => t.id === action.taskId)
             if (task) {
                 task.title = action.title
             }
             return copyState
             }
        case "ADD-TODOLIST":
            const newTodoListId = action.todoListId
            return {...state,[newTodoListId]:[] }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskId:string, todoListId:string):RemoveTaskActionType => {
    return {type:"REMOVE-TASK",taskId:taskId, todoListId:todoListId}
}
export const addTaskAC = (title:string, todoListId:string):AddTaskActionType => {
    return {type:"ADD-TASK", title,todoListId}
}
export const changeTaskStatusAC = (taskId:string,isDone:boolean, todoListId:string):ChangeTaskStatusActionType => {
    return {type:"CHANGE-TASK-STATUS", taskId,todoListId, isDone}
}
export const changeTaskTitleAC = (taskId:string,title:string, todoListId:string):ChangeTaskTitleActionType => {
    return {type:"CHANGE-TASK-TITLE", taskId,todoListId, title}
}
