import {IconButton, TextField} from '@material-ui/core'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addItem = () => {
    if (title.trim() !== '') {
      props.addItem(title)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItem()
    }
  }

  return (
    <div>
      <TextField
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        variant="outlined"
        size="small"
        color="secondary"
        label="Title"
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton onClick={addItem} disabled={props.disabled}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  )
})
