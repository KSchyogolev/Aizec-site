import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageWidget } from '../../widgets'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '15px'
  }
}))


const OffersUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getAllMessages()
  }, [store.messages && store.messages.length])

  return (
    <Grid container spacing={3}>
      {store.messages.map((message,index) => <Grid item xs={12} sm={6} key={index}>
        <MessageWidget {...message}/>
      </Grid>)}
    </Grid>
  )

}

export default inject('store')(observer(OffersUserPage))
