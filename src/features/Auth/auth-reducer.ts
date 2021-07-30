import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {authAPI} from "../../api/todolists-api";
import { appActions } from '../CommonActions/App';


const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType,
    { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})

export const asyncActions = {
    login,
    logout
}

//замена authReducer от redux-toolkit
export const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},

    //state тут - 'черновик' стейта, предоставленный immerjs.
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
            })
    }
})


export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions
