import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { pages } from './config/config'
import { makeStyles, withTheme } from '@material-ui/core/styles'
import { LeftMenu } from './components'
import routes from './config/routes'
import store from './store'
import './App.css'
import { MobxRouter, startRouter } from 'mobx-router'

import { NotificationMessage } from './components'

startRouter(routes, store)

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minWidth: 600
  }
}))

const App = props => {
  const classes = useStyles()
  const {router, currentUser} = props.store
  const isFullPage = router.currentView && (router.currentView.path === '/login' || router.currentView.path === '/registration')
  const [open, setOpen] = useState(true)
  const [notApprovedCount, setApprovedCount] = useState(0)
  const [notifMessage, setNotifMessage] = useState({variant: '', message: ''})
  const [showNotification, toggleVisibleNotification] = useState(false)

  const getStatusCount = (users, status) => {
    return users.filter(user => user.role === 'user' && user.status === status).length
  }

  const handleOpenDrawer = (isOpen) => {
    setOpen(isOpen)
  }

  const setApprovedUsers = (count) => {
    setApprovedCount(count)
  }

  useEffect(() => {
    if (currentUser.role === 'admin') {
      store.initAdmin()
    }
    else if (currentUser.role === 'teacher') {
      store.initTeacher()
    } else if (currentUser.role === 'user') {
      store.initUser()
    }
  }, [])

  return (
    <div className='App'>
      {!isFullPage ?
        <LeftMenu pages={currentUser && currentUser.role && pages[currentUser.role] ? pages[currentUser.role] : []}
                  open={open}
                  setOpen={(isOpen) => handleOpenDrawer(isOpen)}
                  tips={{'users': notApprovedCount}}/> : ''}
      <div className={classes.content}>
        <div className={classes.toolbar}/>
        <MobxRouter/>
      </div>
      <NotificationMessage isOpen={store.notification.show} handleClose={store.closeNotification}
                           variant={store.notification.variant}
                           message={store.notification.message}/>
    </div>
  )

}

export default withTheme(inject('store')(observer(App)))
