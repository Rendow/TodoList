import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '7e928b19-02e3-4839-a906-80cc9541b152'
  }
})


export const todoAPI = {
  getTodos() {
    return instance.get<Array<TodoType>>(`todo-lists`)
  },
  createTodo(title: string) {
    return instance.post<ResponseType<{ item: TodoType }>>(`todo-lists`, {title})
  },
  deleteTodo(todoId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}`)
  },
  updateTodo(todoId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
  },

  getTasks(todoId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
  },
  createTask(todoId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks`, {title})
  },
  deleteTask(todoId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
  },
  updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
  }
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{userId?: number}>>(`auth/login`, data)
  },
  me(){
    return instance.get<ResponseType<MeResponseType>>(`auth/me`)
  },
  logout(){
    return instance.delete<ResponseType>(`auth/login`)
  }
}

// types

//todo & task

export type TodoType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TaskType = {
  id: string
  todoListId: string
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
  order: number
  addedDate: string
}

export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Draft = 3,
  Urgently = 3,
  Later = 4
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  data: T
}

type GetTasksResponse = {
  items: Array<TaskType>
  totalCount: number
  error: string | null
}

// auth

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}

export type MeResponseType = {
  id: number
  email: string
  login: string
}
