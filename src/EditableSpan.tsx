import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title:string
    changeTaskTitle:(newTitle:string) => void
}

function EditableSpan(props:EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTaskTitle(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEnter = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setEditMode(false)
            props.changeTaskTitle(title)
        }
    }

    return(
        editMode ?
            <TextField
                style={{width: '140px'}}
                size={"small"}
                color={'secondary'}
                    variant={'standard'}
                    value={title}
                    autoFocus={true}
                    onChange={changeTitle}
                    onBlur={offEditMode}
                    onKeyPress={onEnter}
            />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan