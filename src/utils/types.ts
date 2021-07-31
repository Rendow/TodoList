import {store} from "../app/store";
import {FieldErrorType} from "../api/types";
import {rootReducer} from "../app/reducer";

export type AppDispatchType = typeof store.dispatch
export type RootReducerType = typeof rootReducer
// определить автоматически тип всего store
export type AppRootStateType = ReturnType<RootReducerType>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
