import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

export type TodoListPropsType = {
    todoListid: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTasks: (taskID: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTodolistTitleFilter: (newTitle:string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle:string, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListid)
    const onAllClickHandler = () => props.changeTodoListFilter('all', props.todoListid)
    const onActiveClickHandler = () => props.changeTodoListFilter('active', props.todoListid)
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed', props.todoListid)
    const removeTodoList = () => props.removeTodolist(props.todoListid)
    const changeTodolistTitle = (title:string) => props.changeTodolistTitleFilter(title, props.todoListid)
    return (
        <div>
            <h3>

                <EditableSpan title={props.title} changeTaskTitle={changeTodolistTitle}/>

                <IconButton onClick={removeTodoList} > <Delete/> </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                {
                    props.tasks.map(task => {

                        const onClickHandler = () => props.removeTasks(task.id, props.todoListid)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListid)
                        const changeTaskTitle = (newTitle:string) =>
                            props.changeTaskTitle(task.id, newTitle,props.todoListid)

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    color={'secondary'}
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />


                                <EditableSpan title={task.title} changeTaskTitle={changeTaskTitle}/>
                                <IconButton onClick={onClickHandler} > <Delete/> </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button

                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={onAllClickHandler}
                > All
                </Button>
                <Button
                    style={{ marginLeft: '5px'}}
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    style={{ marginLeft: '5px'}}
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    size={'small'}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;