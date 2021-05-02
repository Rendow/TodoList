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