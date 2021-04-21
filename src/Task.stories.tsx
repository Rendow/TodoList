import React from 'react';
//@ts-ignore
import {Meta, Story} from '@storybook/react';
// @ts-ignore
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";



export default {
    title: 'TodoList/Task',
    component: Task,
} as Meta;

const changeTaskStatus = action('Status changed inside Task')
const changeTaskTitle = action('Title changed inside Task')
const removeTasks = action('Remove button inside Task')

const Template: Story<TaskPropsType> = (args:TaskPropsType) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus:changeTaskStatus,
    changeTaskTitle:changeTaskTitle,
    removeTasks:removeTasks
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task:{id:'1', isDone:true,title: 'JS'},
    todoListId1:'1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task:{id:'2', isDone:false, title: 'HTML'},
    todoListId1:'2'
};