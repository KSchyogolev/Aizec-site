import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { LeftMenu } from "./components"
import routes from './config/routes'
import store from './store'
import './App.css'
import { MobxRouter, startRouter } from 'mobx-router'


startRouter(routes, store)

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
})

const getMenuPages = (role) => {
  switch (role) {
    case 'admin' : return ['profile', 'users', 'homework', 'calendar']
    case 'teacher' : return ['profile', 'homework']
    case 'student' : return ['profile']
    default : return []
  }
}

@inject('store')
@observer
class App extends Component {

  state = {
    open: true
  }

  handleOpenDrawer = (isOpen) => {
    this.setState({open: isOpen})
  }

  render () {
    const {classes} = this.props
    const {router, currentUser} = store
    const isFullPage = router.currentView && (router.currentView.path === '/login' || router.currentView.path === '/registration')
    return (
      <div className='App'>
        {!isFullPage ? <LeftMenu pages={getMenuPages(currentUser && currentUser.role)} open={this.state.open}
                                 setOpen={(isOpen) => this.handleOpenDrawer(isOpen)}/> : ''}
        <div className={classes.content}>
          <div className={classes.toolbar}/>
          <MobxRouter/>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(withTheme(App))
