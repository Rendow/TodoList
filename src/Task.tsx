import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";


export type TaskPropsType = {
    task:TaskType
    removeTasks: (taskID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean) => void
    changeTaskTitle: (taskID: string, newTitle:string) => void
}


export const Task = React.memo(({...props}:TaskPropsType) => {

    const onClickHandler = () => props.removeTasks(props.task.id)

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)

    const changeTaskTitle = (newTitle:string) =>
        props.changeTaskTitle(props.task.id, newTitle)

    return(
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            color={'secondary'}
            checked={props.task.isDone}
            onChange={changeTaskStatus}
        />


        <EditableSpan title={props.task.title} changeTaskTitle={changeTaskTitle}/>
        <IconButton onClick={onClickHandler}> <Delete/> </IconButton>
    </li>
    )
})
