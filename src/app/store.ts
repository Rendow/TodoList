import thunkMiddleware from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from "./reducer";

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// для обращения к store через консоль
// @ts-ignore
window.store = store

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => {
        // replaceReducer - динамически подменяет главный редюсер
          store.replaceReducer(rootReducer)
    })

}