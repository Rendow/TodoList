import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
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

//hot-reload, если приложение в процессе разработки, то при обновлении данных, они
// обновляются локально, без перезугрузки всей страницы
if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./app/App', () => {
        rerenderTree()
    })
}