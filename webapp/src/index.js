import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import store from './store'
import './index.css'
import App from './App'

// const routingStore = new RouterStore()


const stores = {
  // routing: routingStore,
  store: store
}


ReactDOM.render(<Provider {...stores}><App/></Provider>, document.getElementById('root'))

