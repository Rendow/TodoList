import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolists-api";
import { Dispatch } from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}

const slice = createSlice({
    name:'app',
    initialState:initialState,
    reducers: {
        setAppErrorAC (state, action:PayloadAction<{value:string | null}>) {state.error = action.payload.value},
        setIsInitializedAC  (state, action:PayloadAction<{value:boolean}>) {state.isInitialized = action.payload.value},
        setAppStatusAC (state, action:PayloadAction<{value:RequestStatusType}>) {state.status = action.payload.value},
        }
    })

export const appReducer = slice.reducer
export const {setAppErrorAC,setIsInitializedAC, setAppStatusAC } = slice.actions


export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized:boolean
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
    })
        .finally( () => {dispatch(setIsInitializedAC({value:true}))})
}
