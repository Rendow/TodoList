import {store, rootReducer} from "../app/store";
import {FieldErrorType} from "../api/types";

export type AppDispatchType = typeof store.dispatch
export type RootReducerType = typeof rootReducer
// определить автоматически тип всего store
export type AppRootStateType = ReturnType<RootReducerType>
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }
