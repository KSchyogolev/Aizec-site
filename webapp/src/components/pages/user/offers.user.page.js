import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageWidget } from '../../widgets'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  },
  fullVideo: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    minWidth: '100%',
    minHeight: '100%',
    zIndex: -1
  }
}))
const widgetImg = {
  offer: require('../../../static/images/offer_card.jpg'),
  product: require('../../../static/images/intensive_card.jpg'),
  intensive: require('../../../static/images/intensive_card.jpg'),
  course: require('../../../static/images/regular_card.jpg'),
  regular: require('../../../static/images/regular_card.jpg')
}

const OffersUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  useEffect(() => {
    store.getCurrentOffers()
  }, [store.currentOffers.length])

  return (
    <div>
      <video className={classes.fullVideo} muted loop autoplay="autoplay">
        <source src={require('../../../static/videos/background_3.mov')} type="video/mp4"/>
      </video>
      <Grid container spacing={3}>
        {!store.loading.currentOffers ? store.currentOffers.map((message, index) => <Grid item xs={12} sm={6} md={6} lg={4}
                                                                                          key={index}>
          <MessageWidget {...message}
                         head_text={message.head_text || message.short_description}
                         full_text={message.head_text || message.full_description}
                         key={index}
                         message_id={message.kind === 'offer' ? message.id : null}
                         merch_id={message.kind === 'merch' ? message.id : null}
                         course_id={message.kind === 'intensive' || message.kind === 'regular' ? message.id : null}
                         img={widgetImg[message.kind]}/>
        </Grid>) : <CircularProgress className={classes.fullLoader}/>}
      </Grid>
    </div>
  )
}

export default inject('store')(observer(OffersUserPage))
