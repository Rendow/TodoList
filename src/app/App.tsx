import React, {useCallback, useEffect} from 'react'
import {
    AppBar,
    Button,
    Container,
    createStyles,
    LinearProgress,
    makeStyles,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Todos} from '../features/Todos/Todos'
import {ErrorSnackbar} from '../components/ErrorCnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initAppTC, RequestStatusType} from './app-reducer'
import {Login} from '../features/Login/Login'
import {Route, Switch} from 'react-router-dom'
import {logoutTC} from '../features/Login/auth-reducer'
import {SimpleBackdrop} from '../components/Backdrop/Backdrop'

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
)

const App = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])


    useEffect(() => {
        if (!initialized) dispatch(initAppTC())

    }, [dispatch, initialized])


    return (
        <>
            <SimpleBackdrop/>
            <ErrorSnackbar/>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        style={{cursor: 'default'}}
                        className={classes.title}
                    >
                        Todo
                    </Typography>

                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>

            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Switch>
                    <Route exact path="/" render={() => <Todos/>}/>
                    <Route path="/login" render={() => <Login/>}/>
                </Switch>
            </Container>
        </>
    )
}

export default App
