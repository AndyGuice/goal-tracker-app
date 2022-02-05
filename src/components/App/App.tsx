import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Layout from './Layout'
import Router from '../../router/Router'

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Layout>
          <Router />
        </Layout>
      </LocalizationProvider>
    </BrowserRouter>
  )
}

export default App
