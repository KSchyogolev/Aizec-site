import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import { MessageWidget } from '../../widgets'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { TabPanel, a11yProps } from '../index'

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
  },
  offersBar: {
    background: 'none',
    boxShadow: 'none',
    '& .MuiTabs-indicator': {
      background: 'none'
    },
    '& .MuiTab-root': {
      borderRadius: 5,
      backgroundColor: '#757575',
      margin: 10
    },
    '& .Mui-selected': {
      backgroundColor: '#FF5722',
      opacity: 0.8
    }

  },
  offersHeader: {
    // display: 'flex'
  }
}))



export const getCurrentOffers = (currentOffers = [], count = 2) => currentOffers.map((message, index) => <Grid item
                                                                                                               xs={12}
                                                                                                               sm={12 / count}
                                                                                                               md={12 / count}
                                                                                                               lg={12 / (count + 1)}
                                                                                                               key={index}>
  <MessageWidget {...message}
                 head_text={message.head_text || message.short_description}
                 full_text={message.head_text || message.full_description}
                 isNew={message.isNew}
                 status={message.status}
                 key={index}
                 message_id={message.kind === 'offer' ? message.id : null}
                 merch_id={message.kind === 'merch' ? message.id : null}
                 course_id={message.kind === 'intensive' || message.kind === 'regular' ? message.id : null}
                 images={message.photos}/>
</Grid>)

const OffersUserPage = (props) => {
  const classes = useStyles()
  const {store} = props

  const [value, setValue] = React.useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  useEffect(() => {
    store.getCurrentOffers()
  }, [store.currentOffers.length])

  return (
    <div>
      <video className={classes.fullVideo} muted loop autoplay="autoplay">
        <source src={require('../../../static/videos/background_2.mov')} type="video/mp4"/>
      </video>
      <div className={classes.offersHeader}>
        <AppBar position="static" className={classes.offersBar}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {/*<Tab label="Лента" {...a11yProps(0)} />*/}
            <Tab label="Товары" {...a11yProps(0)} />
            <Tab label="Мои покупки" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {getCurrentOffers(store.currentOffers.filter(item => (item.kind === 'offer' || item.kind === 'merch') && item.status !== 'done'))}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {getCurrentOffers(store.currentOffers.filter(item => item.status === 'done'))}
          </Grid>
        </TabPanel>
      </div>
    </div>
  )
}

export default inject('store')(observer(OffersUserPage))
