import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const HomeworkTeacherPage = props => {
  const classes = useStyles()
  const {store} = props
  return (
    <div className={classes.root}>

    </div>
  )

}

export default inject('store')(observer(HomeworkTeacherPage))
