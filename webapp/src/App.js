import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { LeftMenu } from "./components"
import routes from './config/routes'
import store from './store'
import './App.css'
import { MobxRouter, startRouter } from 'mobx-router'


startRouter(routes, store)

@inject('store')
@observer
class App extends Component {

  render () {
    const {router} = store
    const isFullPage = router.currentView.path === '/login'
    return (
      <div className='App'>
        {!isFullPage ? <LeftMenu pages={['profile', 'homework', 'calendar', 'users']}/> : ''}
        <div className={'content-view ' + (isFullPage ? 'full-page' : '')}>
          <MobxRouter/>
        </div>
      </div>
    )
  }
}

export default App
