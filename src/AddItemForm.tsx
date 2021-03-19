import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const onKeyPressAndItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }


    return (
        <div>
            <TextField
                style={{width: '200'}}
                label={'title'}
                size={"small"}
                color={'primary'}
                variant={'outlined'}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAndItem}
                error={error}
                helperText={error ? 'Title is required!' : ''}
            />


            <IconButton onClick={addItem} > <Add/> </IconButton>

        </div>
    )
}

export default AddItemForm