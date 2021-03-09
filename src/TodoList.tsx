import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
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
                <button onClick={removeTodoList}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map(task => {

                        const onClickHandler = () => props.removeTasks(task.id, props.todoListid)
                        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListid)
                        const changeTaskTitle = (newTitle:string) =>
                            props.changeTaskTitle(task.id, newTitle,props.todoListid)

                        return (
                            <li className={task.isDone ? 'is-done' : ''}>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={changeTaskStatus}
                                />
                                <EditableSpan title={task.title} changeTaskTitle={changeTaskTitle}/>
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