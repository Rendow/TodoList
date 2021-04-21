import React from 'react';
//@ts-ignore
import {Meta, Story} from '@storybook/react';
//@ts-ignore
import {action} from "@storybook/addon-actions";
import {Provider} from "react-redux";
import {AppRootStateType} from "./state/store";
import {combineReducers, createStore} from "redux";
import {taskReducer} from "./state/task-reducer";
import {todoListReducer} from "./state/todolist-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)