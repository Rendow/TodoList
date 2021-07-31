import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './app/App'
import {store} from './app/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

const rerenderTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>, document.getElementById('root'))
}

rerenderTree()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

//hot-reload, если приложение в процессе разработки, то при обновлении данных, они
// обновляются локально, без перезугрузки всей страницы
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./app/App', () => {
        rerenderTree()
    })
}