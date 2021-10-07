import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
)

export function SimpleBackdrop() {
  const classes = useStyles()
  const initialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={!initialized}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
