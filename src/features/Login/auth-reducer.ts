import {authAPI, LoginParamsType} from '../../api/todo-api'
import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {handleNetworkAppError, handleServerAppError} from '../../utils/error-utils'

const initialState = {
  isLoggedIn: false as boolean
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

// actions

export const setIsLoggedInAC = (value: boolean) => {
  return {type: 'LOGIN/SET-IS-LOGGED-IN', value} as const
}

// thunks

export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))

    const res = await authAPI.login(data)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleNetworkAppError(error as Error, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))

    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleNetworkAppError(error as Error, dispatch)
    }
}



// types

export type SetIsLoggedInActionType = typeof setIsLoggedInAC
type ActionType =
  | ReturnType<SetIsLoggedInActionType>
  | SetAppErrorActionType
  | SetAppStatusActionType


