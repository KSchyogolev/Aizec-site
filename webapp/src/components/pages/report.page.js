import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../store'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const ReportPage = props => {
  const classes = useStyles()
  const {store} = props
  return (
    <div className={classes.root}>
      REPORT
    </div>
  )

}

export default inject('store')(observer(ReportPage))
