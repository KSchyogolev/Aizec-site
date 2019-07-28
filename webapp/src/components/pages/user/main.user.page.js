import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { WorkInProgress } from '../../'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const MainUserPage = (props) => {
  const classes = useStyles()
  const {store} = props
  return (
    <div className={classes.root}>
      <WorkInProgress/>
    </div>
  )
}

export default inject('store')(observer(MainUserPage))
