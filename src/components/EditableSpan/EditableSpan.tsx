import React, {ChangeEvent, useState} from 'react'
import {TextField} from '@material-ui/core'

type EditableSpanPropsType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const onEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }

  const offEditMode = () => {
    setEditMode(false)
    props.changeTitle(title)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
    editMode
      ? <TextField
        value={title}
        onChange={onChangeTitleHandler}
        onBlur={offEditMode}
        variant="standard"
        size="small"
        color="secondary"
        autoFocus
      />
      : <span onDoubleClick={onEditMode}>{props.title}</span>
  )
})
