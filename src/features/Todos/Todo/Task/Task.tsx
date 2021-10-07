import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatus, TaskType} from '../../../../api/todo-api'
import {RequestStatusType} from '../../../../app/app-reducer'

type TaskPropsType = {
  task: TaskType
  todoId: string
  removeTask: (taskId: string, todoId: string) => void
  changeTaskStatus: (taskId: string, todoId: string, status: TaskStatus) => void
  changeTaskTitle: (taskId: string, todoId: string, title: string) => void
  entityStatus: RequestStatusType
}

export const Task: React.FC<TaskPropsType> = React.memo(props => {
  const {
    task,
    todoId,
    changeTaskTitle,
    entityStatus,
    removeTask,
    changeTaskStatus
  } = props

  const onClickHandler = () => removeTask(task.id, todoId)

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked
    changeTaskStatus(task.id, todoId, newStatus ? TaskStatus.Completed : TaskStatus.New)
  }

  const onChangeTaskTitleHandler = useCallback((title: string) => {
    changeTaskTitle(task.id, todoId, title)
  }, [changeTaskTitle, task.id, todoId])

  return (
    <li key={task.id} className={task.status === TaskStatus.Completed ? 'is-done' : ''}>
      <Checkbox
        checked={task.status === TaskStatus.Completed}
        onChange={onChangeTaskStatusHandler}
        disabled={entityStatus === 'loading'}
      />
      <EditableSpan title={task.title} changeTitle={onChangeTaskTitleHandler} />
      <IconButton onClick={onClickHandler} disabled={entityStatus === 'loading'}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  )
})
