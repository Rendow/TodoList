import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {Task} from './Task/Task'
import {TodoDomainType, TodoFilterValueType} from '../todos-reducer'
import {TaskStatus, TaskType} from '../../../api/todo-api'
import {useDispatch} from 'react-redux'
import {fetchTasksTC} from '../tasks-reducer'

type TodoPropsType = {
  todo: TodoDomainType
  changeTodoFilter: (value: TodoFilterValueType, todoId: string) => void
  changeTodoTitle: (title: string, todoId: string) => void
  removeTodo: (todoId: string) => void
  tasks: Array<TaskType>
  addTask: (title: string, todoId: string) => void
  removeTask: (taskId: string, todoId: string) => void
  changeTaskTitle: (taskId: string, todoId: string, title: string) => void
  changeTaskStatus: (taskId: string, todoId: string, status: TaskStatus) => void
}

export const Todo: React.FC<TodoPropsType> = React.memo((props) => {

  const {
    tasks,
    todo,
    addTask,
    removeTask,
    changeTodoTitle,
    changeTodoFilter,
    changeTaskStatus,
    changeTaskTitle,
    removeTodo
  } = props

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todo.id))
  }, [dispatch, todo.id])

  const onRemoveTodo = () => removeTodo(todo.id)

  const onChangeTodoTitle = useCallback((title: string) => {
    return changeTodoTitle(title, todo.id)
  }, [changeTodoTitle, todo.id])

  const onAddTask = useCallback((title: string) => {
    return addTask(title, todo.id)
  }, [addTask, todo.id])

  const allClickHandler = useCallback(() => {
    return changeTodoFilter('all', todo.id)
  }, [changeTodoFilter, todo.id])

  const activeClickHandler = useCallback(() => {
    return changeTodoFilter('active', todo.id)
  }, [changeTodoFilter, todo.id])

  const completedClickHandler = useCallback(() => {
    return changeTodoFilter('completed', todo.id)
  }, [changeTodoFilter, todo.id])

  let tasksForTodo = tasks

  if (todo.filter === 'active') {
    tasksForTodo = tasks.filter(task => task.status === TaskStatus.New)
  }

  if (todo.filter === 'completed') {
    tasksForTodo = tasks.filter(task => task.status === TaskStatus.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={todo.title} changeTitle={onChangeTodoTitle} />
        <IconButton onClick={onRemoveTodo} disabled={todo.entityStatus === 'loading'}>
          <Delete fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={onAddTask} disabled={todo.entityStatus === 'loading'} />
      <ul style={{listStyle: 'none', padding: '0', margin: '0'}}>
        {
          tasksForTodo.map(task => {
            return (
              <Task
                key={task.id}
                task={task}
                todoId={todo.id}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
                entityStatus={todo.entityStatus}
              />
            )
          })
        }
      </ul>
      <div>
        <Button
          onClick={allClickHandler}
          color="secondary"
          variant={todo.filter === 'all' ? 'outlined' : 'text'}
          size="small"
        >
          All
        </Button>
        <Button
          onClick={activeClickHandler}
          color="secondary"
          variant={todo.filter === 'active' ? 'outlined' : 'text'}
          size="small"
        >
          Active
        </Button>
        <Button
          onClick={completedClickHandler}
          color="secondary"
          variant={todo.filter === 'completed' ? 'outlined' : 'text'}
          size="small"
        >
          Completed
        </Button>
      </div>
    </div>
  )
})
