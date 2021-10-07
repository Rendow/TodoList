import {Dispatch} from 'redux'
import {todoAPI, TodoType} from '../../api/todo-api'
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleNetworkAppError} from '../../utils/error-utils'

const initialState: Array<TodoDomainType> = []

export const todosReducer = (state: Array<TodoDomainType> = initialState, action: ActionType): Array<TodoDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODO':
      return state.filter(todo => todo.id !== action.todoId)
    case 'ADD-TODO':
      return [{...action.todo, filter: 'all', entityStatus: 'idle'}, ...state]
    case 'CHANGE-TODO-TITLE':
      return state.map(todo => todo.id === action.todoId ? {...todo, title: action.title} : todo)
    case 'CHANGE-TODO-FILTER':
      return state.map(todo => todo.id === action.todoId ? {...todo, filter: action.filter} : todo)
    case 'CHANGE-TODO-ENTITY-STATUS':
      return state.map(todo => todo.id === action.todoId ? {...todo, entityStatus: action.status} : todo)
    case 'SET-TODOS':
      return action.todos.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
    default:
      return state
  }
}

// actions

export const removeTodoAC = (todoId: string) => {
  return {type: 'REMOVE-TODO', todoId} as const
}

export const addTodoAC = (todo: TodoType) => {
  return {type: 'ADD-TODO', todo} as const
}

export const changeTodoTitleAC = (todoId: string, title: string) => {
  return {type: 'CHANGE-TODO-TITLE', todoId, title} as const
}

export const changeTodoFilterAC = (todoId: string, filter: TodoFilterValueType) => {
  return {type: 'CHANGE-TODO-FILTER', todoId, filter} as const
}

export const setTodosAC = (todos: Array<TodoType>) => {
  return {type: 'SET-TODOS', todos} as const
}

export const changeTodoEntityStatusAC = (todoId: string, status: RequestStatusType) => {
  return {type: 'CHANGE-TODO-ENTITY-STATUS', todoId, status} as const
}

// thunks

export const fetchTodosTC = () => (dispatch: Dispatch<ActionType>) => {
  dispatch(setAppStatusAC('loading'))
  todoAPI.getTodos()
    .then((res) => {
      dispatch(setTodosAC(res.data))
    })
    .catch((error) => {
      handleNetworkAppError(error, dispatch)
    })
}

export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodoEntityStatusAC(todoId, 'loading'))
  todoAPI.deleteTodo(todoId)
    .then((res) => {
      dispatch(removeTodoAC(todoId))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) => {
      handleNetworkAppError(error, dispatch)
      dispatch(changeTodoEntityStatusAC(todoId, 'failed'))
    })
}

export const addTodoTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(setAppStatusAC('loading'))
  todoAPI.createTodo(title)
    .then((res) => {
      dispatch(addTodoAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((error) => {
      console.log(error)
      handleNetworkAppError(error, dispatch)
    })
}


export const changeTodoTitleTC = (todoId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
  dispatch(setAppStatusAC('loading'))
  todoAPI.updateTodo(todoId, title)
      .then(() => {
        dispatch(changeTodoTitleAC(todoId, title))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((error) => {
        handleNetworkAppError(error, dispatch)
      })
}

// types

export type SetTodosActionType = ReturnType<typeof setTodosAC>
export type RemoveTodoActionType = ReturnType<typeof removeTodoAC>
export type AddTodoActionType = ReturnType<typeof addTodoAC>

type ActionType =
  | RemoveTodoActionType
  | AddTodoActionType
  | SetTodosActionType
  | ReturnType<typeof changeTodoTitleAC>
  | ReturnType<typeof changeTodoFilterAC>
  | SetAppStatusActionType
  | ReturnType<typeof changeTodoEntityStatusAC>
  | SetAppErrorActionType

export type TodoFilterValueType = 'all' | 'active' | 'completed'
export type TodoDomainType = TodoType & {
  filter: TodoFilterValueType,
  entityStatus: RequestStatusType
}
