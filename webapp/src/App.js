import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import './App.css'


@inject('store')
@observer
class App extends Component {

  render() {

    return (
      <div className='App'>
        HELLO WORLD
      </div>
    )
  }
}

export default App
