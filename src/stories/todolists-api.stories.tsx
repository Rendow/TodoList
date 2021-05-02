import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";
import {Button, Input, TextField} from "@material-ui/core";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
       'API-KEY': '7e928b19-02e3-4839-a906-80cc9541b152'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistAPI.getTodos()
            .then((res) => {
                setState(res);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistAPI.createTodo("react")
            .then( res => {
                setState(res.data);
            } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'bb622ce4-666f-42b8-b711-dae446f6bb78';

        todolistAPI.deleteTodolist(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '3970219b-20f2-47d0-8f45-0fc245f615c5'

        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTodolistTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '3970219b-20f2-47d0-8f45-0fc245f615c5'

        todolistAPI.getTodoTask(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GreateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const createTask = () => {
        todolistAPI.createTodoTask(todolistId,title)
            .then((res) => {
                setState(res);
            })
    }
    return <div> {JSON.stringify(state) === null ? 'wait..' : JSON.stringify(state)}
        <div>< TextField variant={"outlined"} placeholder={'todolist-id'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/></div>
        <div>< TextField variant={"outlined"} placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/></div>
        <Button color={"secondary"} variant={"outlined"} onClick={createTask}> create task </Button>
    </div>
}
export const UpdateTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [id, setId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const updateTask = () => {
        todolistAPI.updateTodoTask(todolistId,id,title)
            .then((res) => {
                setState(res);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>< TextField variant={"outlined"} placeholder={'todolist-id'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/></div>
        <div>< TextField variant={"outlined"} placeholder={'task-id'} value={id} onChange={(e) => {setId(e.currentTarget.value)}}/></div>
        <div>< TextField variant={"outlined"} placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/></div>
        <Button color={"secondary"} variant={"outlined"} onClick={updateTask}> update task </Button>
    </div>
}
export const DeleteTodolistTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [id, setId] = useState<any>(null)


    const deleteTask = () => {
        todolistAPI.deleteTodoTask(todolistId, id)
            .then((res) => {
                setState(res);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>< TextField variant={"outlined"} placeholder={'todolist-id'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/></div>
        <div>< TextField variant={"outlined"} placeholder={'task-id'} value={id} onChange={(e) => {setId(e.currentTarget.value)}}/></div>
         <Button color={"secondary"} variant={"outlined"} onClick={deleteTask}> delete task </Button>
    </div>
}