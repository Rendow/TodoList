import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
  addTodoTC,
  changeTodoFilterAC,
  changeTodoTitleTC,
  deleteTodoTC,
  fetchTodosTC,
  TodoDomainType,
  TodoFilterValueType
} from './todos-reducer'
import {addTaskTC, deleteTasksTC, TasksType, updateTaskTC} from './tasks-reducer'
import {TaskStatus} from '../../api/todo-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todo} from './Todo/Todo'
import {Redirect} from 'react-router-dom'

export const Todos: React.FC = () => {
  const dispatch = useDispatch()
  const todos = useSelector<AppRootStateType, Array<TodoDomainType>>(state => state.todos)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodosTC())
  }, [dispatch, isLoggedIn])

  const addTodo = useCallback((title: string) => {
    dispatch(addTodoTC(title))
  }, [dispatch])

  const changeTodoFilter = useCallback((value: TodoFilterValueType, todoId: string) => {
    dispatch(changeTodoFilterAC(todoId, value))
  }, [dispatch])

  const changeTodoTitle = useCallback((title: string, todoId: string) => {
    dispatch(changeTodoTitleTC(todoId, title))
  }, [dispatch])

  const removeTodo = useCallback((todoId: string) => {
    dispatch(deleteTodoTC(todoId))
  }, [dispatch])

  const changeTaskStatus = useCallback((taskId: string, todoId: string, status: TaskStatus) => {
    dispatch(updateTaskTC(todoId, taskId, {status}))
  }, [dispatch])

  const addTask = useCallback((title: string, todoId: string) => {
    dispatch(addTaskTC(title, todoId))
  }, [dispatch])

  const removeTask = useCallback((taskId: string, todoId: string) => {
    dispatch(deleteTasksTC(todoId, taskId))
  }, [dispatch])

  const changeTaskTitle = useCallback((taskId: string, todoId: string, title: string) => {
    dispatch(updateTaskTC(todoId, taskId, {title}))
  }, [dispatch])


  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm addItem={addTodo} />
      </Grid>
      <Grid style={{marginLeft:'10px'}} container spacing={3}>
        {
          todos.map(todo => {
            return (
              <Grid item key={todo.id}>
                <Paper style={{padding: '10px'}} elevation={5}>
                  <Todo
                    todo={todo}
                    changeTodoFilter={changeTodoFilter}
                    removeTodo={removeTodo}
                    changeTodoTitle={changeTodoTitle}
                    tasks={tasks[todo.id]}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            )
          })
        }
      </Grid>
    </>
  )
}
