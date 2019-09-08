import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageWidget } from '../../widgets'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  },
  fullLoader: {
    left: '50%',
    top: '40%',
    width: '50px !important',
    height: '50px !important',
    position: 'absolute'
  }
}))

const OffersUserPage = (props) => {
  const classes = useStyles()
  const {store} = props
  useEffect(() => {
    store.getCurrentOffers()
  }, [store.currentOffers.length])

  return (
    <Grid container spacing={3}>
      {!store.loading.currentOffers ? store.currentOffers.map((message, index) => <Grid item xs={12} sm={6} key={index}>
        <MessageWidget {...message} key={index}/>
      </Grid>) :  <CircularProgress className={classes.fullLoader}/>}
    </Grid>
  )
}

export default inject('store')(observer(OffersUserPage))
