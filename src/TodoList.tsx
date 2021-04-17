import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
    const removeTodoList = () => props.removeTodolist(todoListid)
    const changeTodolistTitle = useCallback((title:string) => props.changeTodolistTitleFilter(title, todoListid),[props.changeTodolistTitleFilter,todoListid])

    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
    }

    const onClickHandler = useCallback((id:string) => props.removeTasks(id, todoListid),[props.removeTasks,todoListid])

    const changeTaskStatus = useCallback((id:string, isDone:boolean) => props.changeTaskStatus(id, isDone, todoListid),[props.changeTaskStatus,todoListid])

    const changeTaskTitle = useCallback((id:string,newTitle:string) => props.changeTaskTitle(id, newTitle,todoListid),[props.changeTaskTitle,todoListid])

    return (
        <div>
            <h3>

                <EditableSpan title={title} changeTaskTitle={changeTodolistTitle}/>

                <IconButton onClick={removeTodoList} > <Delete/> </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: 'none', paddingLeft: '0'}}>

                {
                    tasksForTodolist.map(task => {

                        return (
                            <Task
                                key={task.id}
                                task={task}
                                removeTasks={onClickHandler}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}/>
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

