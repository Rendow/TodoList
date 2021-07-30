import {useDispatch} from "react-redux";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import {AppDispatchType} from "./types";

export const AppDispatch = () => useDispatch<AppDispatchType>()

export function useActions<T extends ActionCreatorsMapObject<any>>(action:T){
    const dispatch = AppDispatch()

    //bindActionCreators связывает санку\экшн и с дипатчем, позволяя сократить код: dispatch(action(value)) -> action(value)
    //useMemo сохраняет вычесленные значения функции
    const boundAction = useMemo(() => {
        return bindActionCreators(action,dispatch)
    },[])

    return boundAction
}