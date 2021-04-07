import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, IconButton, Toolbar, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todoListReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed' // | - и

export type TodoListType = {
    title: string
    id: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: TaskType[]
}

function AppWithReducer() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer,[
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, dispatchTasks] = useReducer( taskReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'js', isDone: false},
            {id: v1(), title: 'GTML', isDone: true},
            {id: v1(), title: 'TSX', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'potato', isDone: false},
        ],
    })

    function removeTask(taskID: string, todoListID: string) {
       let action =  removeTaskAC(taskID, todoListID)
        dispatchTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        let action =  addTaskAC(title, todoListID)
        dispatchTasks(action)
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        let action =  changeTaskStatusAC(taskID,newIsDoneValue, todoListID)
        dispatchTasks(action)
    }
    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action =  changeTaskTitleAC(taskID,newTitle, todoListID)
        dispatchTasks(action)
    }


    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        let action =  ChangeTodoListFilterAC(todoListID,newFilterValue)
        dispatchTodoLists(action)
    }

    function changeTodolistTitleFilter(newTitle: string, todoListID: string) {
        let action =  ChangeTodoListAC(newTitle,todoListID)
        dispatchTodoLists(action)
    }

    function removeTodolist(todoListID: string) {
        let action =  RemoveTodoListAC(todoListID)
        dispatchTodoLists(action)
    }

    function addTodoList(title: string) {
        let action =  AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    // UI
    //crud - create,read,update,delete

    return (
        <div className="App">
            <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            </AppBar>
            <Container fixed>

           <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodoList}/>
           </Grid>

                <Grid container spacing={4}>
            { todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={5} style={{ padding: ' 20px'}}>
                            <TodoList
                                todoListid={tl.id}
                                title={tl.title}
                                tasks={tasksForTodoList}
                                filter={tl.filter}
                                addTask={addTask}
                                removeTasks={removeTask}
                                changeTodoListFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                removeTodolist={removeTodolist}
                                changeTodolistTitleFilter={changeTodolistTitleFilter}
                            />
                        </Paper></Grid>

                    )
                }) }
            </Grid>

            </Container>
        </div>
    )
}

export default AppWithReducer;

