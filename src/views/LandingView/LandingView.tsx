import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { Navigate } from 'react-router-dom'

function LandingView() {
  const profile = localStorage.getItem('profile')!
  const [
    user,
  ] = useState(JSON.parse(profile))

  if (user) {
    return <Navigate to="/dashboard" />
  }
  return (
    <Box textAlign="center" style={{ paddingTop: 40 }}>
      <Typography variant="h5">
        Welcome to my humble Goal Tracking application. The intent of this app is to help you set
        goals with measurable tasks in order to help you achieve them.
        <Divider sx={{ margin: 2 }} />
        Please login to get started, and thank you for checking it out.
      </Typography>
    </Box>
  )
}

export default LandingView
