import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import WarningIcon from '@material-ui/icons/Warning'


const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px',
    backgroundColor: '#f3d0c5',
    display:'flex',
    padding: 17
  },
  notifText: {
    fontSize: 22,
    display:'flex',
    margin: 'auto',
  },
  largeIcon: {
    fontSize: '2.1rem',
    display:'flex',
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0
  }
}))


const WorkInProgress = props => {
  const classes = useStyles()
  const {store} = props
  return (
    <Typography component='div' className={classes.root}>

      <WarningIcon className={classes.largeIcon}/>

      <Typography component='div' className={classes.notifText}>
        Личный кабинет находится в разработке, некоторые функции могут быть недоступны.
      </Typography>

    </Typography>
  )

}

export default WorkInProgress
