import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {EditableSpan, EditableSpanPropsType} from "../components/EditableSpan/EditableSpan";


export default {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    argTypes:{
        onChange:{
            description:'Changed value editable span'
        },
        value: {
            defaultValue:'defaultValue',
            description:'Start value to editable span',
            name: "span"
        }
    }
} as Meta;


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>


export const EditAbleSpanExample = Template.bind({});

EditAbleSpanExample.args = {
    onChange: action('Value changed')
};

