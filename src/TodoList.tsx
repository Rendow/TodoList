import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTasks: (taskID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
}

function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>(' ')
    const [error, setError] = useState<boolean>(false)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
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
    const onAllClickHandler = () => props.changeTodoListFilter('all')
    const onActiveClickHandler = () => props.changeTodoListFilter('active')
    const onCompletedClickHandler = () => props.changeTodoListFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
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

                    const onClickHandler = () => props.removeTasks(task.id)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

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