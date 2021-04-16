import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export const TodoList = React.memo(({todoListid,title, ...props}: TodoListPropsType) => {

    const addTask = useCallback((title: string) => props.addTask(title, todoListid),[todoListid,props.addTask])
    const onAllClickHandler = useCallback(() => props.changeTodoListFilter('all', todoListid),[todoListid])
    const onActiveClickHandler = useCallback(() => props.changeTodoListFilter('active', todoListid),[todoListid])
    const onCompletedClickHandler = useCallback(() => props.changeTodoListFilter('completed',todoListid),[todoListid])
    const removeTodoList = useCallback(() => props.removeTodolist(todoListid),[])
    const changeTodolistTitle = useCallback((title:string) => props.changeTodolistTitleFilter(title, todoListid),[props.changeTodolistTitleFilter,todoListid])

    let allTodoListTasks = props.tasks
    let tasksForTodolists = allTodoListTasks

    if (props.filter === 'active') {
        tasksForTodolists = allTodoListTasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolists = allTodoListTasks.filter(t => t.isDone === true)
    }
    return (
        <div>
            <h3>

                <EditableSpan title={title} changeTaskTitle={changeTodolistTitle}/>

                <IconButton onClick={removeTodoList} > <Delete/> </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0'}}>

                {
                    props.tasks.map(task => {

                        const onClickHandler = useCallback(() => props.removeTasks(task.id, todoListid),[])
                        const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(task.id, e.currentTarget.checked, todoListid),[])
                        const changeTaskTitle = useCallback((newTitle:string) =>
                            props.changeTaskTitle(task.id, newTitle,todoListid),[])

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

})

