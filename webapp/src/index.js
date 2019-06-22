import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import Store from './Store'
import './index.css'
import App from './App'

ReactDOM.render(<Provider store={Store}><App/></Provider>, document.getElementById('root'))

