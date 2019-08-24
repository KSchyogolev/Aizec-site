import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import MaterialTable from "material-table"

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const RemindersPage = (props) => {
  const classes = useStyles()
  const {store} = props
  return (
    <div className={classes.root}>
    </div>
  )

}

export default inject('store')(observer(RemindersPage))
