import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7e928b19-02e3-4839-a906-80cc9541b152'
    }
})



export const todolistAPI = {
    getTodos(){
        return instance.get<TodolistType[]>('todo-lists')

    },
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },

    updateTodolist(todolistId: string, title: string) {
        return  instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})

    },
    getTodoTask(todolistId: string){
        return instance.get<TypeTask>(`todo-lists/${todolistId}/tasks`)

    },
    createTodoTask(todolistId: string,title: string) {
        return instance.post<TypeTask>(`todo-lists/${todolistId}/tasks`, {title})

    },
    updateTodoTask(todolistId: string,id:string,title: string) {
        return instance.put<TypeTask<UpdateTaskType[]>>(`todo-lists/${todolistId}/tasks/${id}`, {title})

    },
    deleteTodoTask(todolistId: string,id:string) {
        return instance.delete<TypeTask>(`todo-lists/${todolistId}/tasks/${id}`)

    },

}
type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    fieldsErrors:string[]
    resultCode: number
    messages: Array<string>
    data: D
}
type TypeTask <D = ItemsType[]> = {
    error: string | null
    totalCount: number
    items: D
}
 type ItemsType = {
     description: string
     title: string
     completed: boolean
     status:number
     priority: number
     startDate:string
     deadline: string
     id: string
     todoListId: string
     order: number
     addedDate:string
 }
type UpdateTaskType = {
    description: string
    title: string
    status:number
    priority: number
    startDate:string
    deadline: string
}