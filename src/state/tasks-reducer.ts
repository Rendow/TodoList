import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from '../api/todolist-api'
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
   task:TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType | SetTodosActionType
    | RemoveTodolistActionType | SetTaskTypeAC

const initialState: TasksStateType = {
    // 'id1':[],
    // 'id2':[]

    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            let stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "SET-TODOS": {
            let stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}

            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, status: action.status } : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? { ...t, title: action.title } : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (taskId: string, todolistId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, todolistId,status }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTaskAC  = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS',  todolistId, tasks} as const
}

export type SetTaskTypeAC = ReturnType<typeof setTaskAC>

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items
            dispatch(setTaskAC(tasks, todolistId))
        })
}

export const removeTaskTC = (id: string, todolistId: string)  => (dispatch:Dispatch) => {

    todolistApi.deleteTask(todolistId,id )
        .then(res => {
            const action = removeTaskAC(id, todolistId);
            dispatch(action);
        })
}
export const addTaskTC = (todoid: string,taskTitle: string)  => (dispatch:Dispatch) => {
    todolistApi.createTask(todoid,taskTitle) //отправили таску
        .then((res) => {
            let newTask = res.data.data.item //вернулась таска
            const action = addTaskAC(newTask);
            dispatch(action);
        })
}
export  const updateTaskStatusTC = (taskId: string, todolistId: string,status:TaskStatuses) =>  (dispatch: Dispatch, getState: () => AppRootStateType) => {

    let state = getState()
    let allTask = state.tasks
    let findTasks = allTask[todolistId]
    let findTask = findTasks.find((t)=>{
        return t.id === taskId
    })

    if (findTask) {
        const model:UpdateTaskModelType = {
            title: findTask.title,
            startDate: findTask.startDate,
            priority: findTask.priority,
            description: findTask.description,
            deadline: findTask.deadline,
            status: status
        }

        todolistApi.updateTask(todolistId, taskId, model )
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, todolistId,status))

            })
    }

}
