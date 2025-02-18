import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import store from '../../store'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const FeedPage = props => {
  const classes = useStyles()
  const {store} = props
  return (
    <div className={classes.root}>
      FEED
    </div>
  )

}

export default inject('store')(observer(FeedPage))
