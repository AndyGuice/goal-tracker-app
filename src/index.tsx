import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './styles/global.css'
import { reducers } from './store/reducers'
import App from './components/App/App'
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material'
import theme from './config/theme'

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
)
