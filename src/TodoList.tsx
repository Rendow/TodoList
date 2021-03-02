import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    todoListid:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string,todoListID:string) => void
    removeTasks: (taskID: string,todoListID:string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType,todoListID:string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean,todoListID:string) => void
    removeTodolist:(todoListID:string) => void
}

function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>(' ')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle,props.todoListid)
        } else {
            setError(true)
        }
        setTitle(' ')
    }

    const onKeyPressAndTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onAllClickHandler = () => props.changeTodoListFilter('all',props.todoListid)
    const onActiveClickHandler = () => props.changeTodoListFilter('active',props.todoListid)
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed',props.todoListid)
    const removeTodoList  = () => props.removeTodolist(props.todoListid)
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressAndTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}> add</button>
                {error && <div className='error-message'>Title is required!</div>}
            </div>
            <ul>
                {
                    props.tasks.map(task => {

                    const onClickHandler = () => props.removeTasks(task.id,props.todoListid)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked,props.todoListid)

                    return (
                        <li className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={onAllClickHandler}> All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;