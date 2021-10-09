import {TaskPriority, TaskStatus, TaskType, todoAPI, UpdateTaskModelType} from '../../api/todo-api'
import {AddTodoActionType, RemoveTodoActionType, SetTodosActionType} from './todos-reducer'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleNetworkAppError, handleServerAppError} from '../../utils/error-utils'

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todoId]: state[action.todoId].filter(task => task.id !== action.taskId)}
    case 'ADD-TASK':
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
    case 'UPDATE-TASK':
      return {
        ...state, [action.todoId]: state[action.todoId].map(task => task.id === action.taskId
          ? {...task, ...action.model}
          : task
        )
      }
    case 'ADD-TODO':
      return {...state, [action.todo.id]: []}
    case 'REMOVE-TODO': {
      const stateCopy = {...state}
      delete stateCopy[action.todoId]
      return stateCopy
    }
    case 'SET-TODOS': {
      const copyState = {...state}
      action.todos.forEach(todo => {
        copyState[todo.id] = []
      })
      return copyState
    }
    case 'SET-TASKS':
      return {...state, [action.todoId]: action.tasks}
    default:
      return state
  }
}

// actions

export const removeTaskAC = (taskId: string, todoId: string) => {
  return {type: 'REMOVE-TASK', taskId, todoId} as const
}

export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}

export const updateTaskAC = (taskId: string, todoId: string, model: UpdateDomainTaskModelType) => {
  return {type: 'UPDATE-TASK', taskId, todoId, model} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todoId: string) => {
  return {type: 'SET-TASKS', tasks, todoId} as const
}

// thunks

export const fetchTasksTC = (todoId: string) => async (dispatch: Dispatch<ActionType>) => {
  const res = await todoAPI.getTasks(todoId)
  try {
      dispatch(setTasksAC(res.data.items, todoId))
      dispatch(setAppStatusAC('succeeded'))
    }
    catch(error) {
      handleNetworkAppError(error as Error, dispatch)
    }
}

export const deleteTasksTC = (todoId: string, taskId: string) => async (dispatch: Dispatch<ActionType>) => {
  dispatch(setAppStatusAC('loading'))

  const res = await todoAPI.deleteTask(todoId, taskId)
  try {
      if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(taskId, todoId))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }
    catch(error) {
      handleNetworkAppError(error as Error, dispatch)
    }
}


export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionType | SetAppErrorActionType | SetAppStatusActionType>) => {
  dispatch(setAppStatusAC('loading'))
  const res = await todoAPI.createTask(todolistId, title)
  try {
    if (res.data.resultCode === 0) {
      const task = res.data.data.item
      const action = addTaskAC(task)
      dispatch(action)
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error) {
    handleNetworkAppError(error as Error, dispatch)
  }
}
export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  return async (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

    const state = getState()
    const task = state.tasks[todoId].find(task => task.id === taskId)
    if (!task) {
      console.warn('task not found')
      return
    }

    const apiModel: UpdateTaskModelType = {
      status: task.status,
      startDate: task.startDate,
      priority: task.priority,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      ...domainModel
    }

    dispatch(setAppStatusAC('loading'))
    const res = await todoAPI.updateTask(todoId, taskId, apiModel)
    try {
      if (res.data.resultCode === 0) {
        dispatch(updateTaskAC(taskId, todoId, domainModel))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (error) {
      handleNetworkAppError(error as Error, dispatch)
    }
  }
}

// types

export type TasksType = {
  [key: string]: Array<TaskType>
}

type ActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | SetTodosActionType
  | RemoveTodoActionType
  | AddTodoActionType
  | SetAppErrorActionType
  | SetAppStatusActionType

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}
