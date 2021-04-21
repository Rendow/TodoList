import React from 'react';
//@ts-ignore
import {Meta, Story} from '@storybook/react';
//@ts-ignore
import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as Meta;

//@ts-ignore
const Template: Story = () =>   <AppWithRedux />

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

