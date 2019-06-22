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
    return (
      <div className='App'>
        <LeftMenu pages={['profile','homework','calendar']}/>
        <div className={'content-view'}>
          <MobxRouter/>
        </div>
      </div>
    )
  }
}

export default App
