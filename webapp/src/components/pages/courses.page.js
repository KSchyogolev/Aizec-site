import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const CoursesPage = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      COURSES
    </div>
  )

}

export default inject('store')(observer(CoursesPage))
