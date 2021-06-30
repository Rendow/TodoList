import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from '../api/todolists-api'
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {loginTC, logoutTC, setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        }
})
// export const initializeAppTCs = () => (dispatch: Dispatch) => {
//     authAPI.me().then(res => {
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC({value: true}))
//         }
//         dispatch(setAppInitializedAC({isInitialized: true}))
//     })
// }

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        // setAppInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
        //     state.isInitialized = action.payload.isInitialized
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })

    }
})

export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: boolean
}

export const {setAppErrorAC, setAppStatusAC} = slice.actions


export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

