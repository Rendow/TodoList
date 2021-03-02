import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed' // | - или

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'js', isDone: false},
        {id: v1(), title: 'GTML', isDone: true},
        {id: v1(), title: 'TSX', isDone: false},
    ])

    //BLL

    function removeTask(taskID: string) {
        let filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    function addTask(title: string){
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
    }
    function changeTaskStatus (taskID: string,newIsDoneValue:boolean) {
        const task = tasks.find(t => t.id === taskID)
        if(task){
              task.isDone = newIsDoneValue
              setTasks([...tasks])
        }
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue)
    }

    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    // UI
    //crud - create,read,update,delete

    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForTodoList}
                filter={filter}
                addTask={addTask}
                removeTasks={removeTask}
                changeTodoListFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}

export default App;

