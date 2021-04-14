import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {AddTodoListAC, ChangeTodoListAC, ChangeTodoListFilterAC, RemoveTodoListAC} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


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

function AppWithRedux() {

let todoLists = useSelector<AppRootStateType,TodoListType[] >( state => state.todolists)
let tasks = useSelector<AppRootStateType,TaskStateType >( state => state.tasks)
    //вторым параметром в типизации, то, что возвращает

let dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
       let action =  removeTaskAC(taskID, todoListID)
        dispatch(action)
    },[])

    const addTask = useCallback((title: string, todoListID: string) => {
        let action =  addTaskAC(title, todoListID)
        dispatch(action)
    },[])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todoListID: string) => {
        let action =  changeTaskStatusAC(taskID,newIsDoneValue, todoListID)
        dispatch(action)
    },[])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action =  changeTaskTitleAC(taskID,newTitle, todoListID)
        dispatch(action)
    },[])


    const changeFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        let action =  ChangeTodoListFilterAC(todoListID,newFilterValue)
        dispatch(action)
    },[])

    const changeTodolistTitleFilter = useCallback((newTitle: string, todoListID: string)=> {
        let action =  ChangeTodoListAC(newTitle,todoListID)
        dispatch(action)
    },[])

    const removeTodolist = useCallback((todoListID: string) =>{
        let action =  RemoveTodoListAC(todoListID)
        dispatch(action)
    },[])

    const addTodoList = useCallback((title: string) => {
        let action =  AddTodoListAC(title)
        dispatch(action)
    }, [])

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

                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={5} style={{ padding: ' 20px'}}>
                            <TodoList
                                todoListid={tl.id}
                                title={tl.title}
                                tasks={tasks[tl.id]}
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

export default AppWithRedux;

