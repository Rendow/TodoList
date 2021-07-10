// * - ипортируем все из файла
import * as tasksActions from './tasks-reducer'
import {AsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'


const  todolistsActions = {
    ...AsyncActions,
    ...slice.actions
}
export {
    tasksActions,todolistsActions
}