import { Dispatch } from 'redux'
import {setAppStatusAC } from '../../app/app-reducer'
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

//замена authReducer от redux-toolkit
const slice = createSlice({
    name:'auth',
    initialState:initialState,

    //state тут - 'черновик' стейта, предоставленный immerjs.
    reducers: {
        setIsLoggedInAC(state, action:PayloadAction<{value:boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

type RequestType = {
    email:string
    password: string
    rememberMe: boolean
}
export const loginTC = (data: RequestType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value:'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({value: 'succeeded'}))

            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
     })

}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({value:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({value:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

