import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


export default {
    title: 'Todolists/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => <div>
    <Task task={{id: '1', status: TaskStatuses.Completed, title: 'css', todoListId: 'todolist1', addedDate: '',
        deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Low} }
          todolistId={'todolist1'}
          removeTask={removeCallback}
          changeTaskStatus={changeStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}/>

    <Task task={{id: '2', status: TaskStatuses.New, title: 'js',todoListId: 'todolist1', addedDate: '',
        deadline: '', description: '', startDate: '', order: 0, priority: TaskPriorities.Low}}
          todolistId={'todolist2'}
          removeTask={removeCallback}
          changeTaskStatus={changeStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}/>
</div>;

export const TaskExample = Template.bind({});
TaskExample.args = {};

