import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Add} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log('asdasd')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const onKeyPressAndItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error) setError(false);
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
})

