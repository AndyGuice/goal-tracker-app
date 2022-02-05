import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  ThemeProvider,
  CssBaseline,
} from '@mui/material'
import Layout from './Layout'
import Router from '../../router/Router'
import theme from '../../config/theme'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Layout>
            <Router />
          </Layout>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
