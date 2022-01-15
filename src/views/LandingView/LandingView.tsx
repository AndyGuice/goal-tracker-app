import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Redirect } from 'react-router-dom'

const LandingView = () => {
  const profile = localStorage.getItem('profile')!;
  const [
    user,
  ] = useState(JSON.parse(profile));

  if (user) {
    return (
      <Redirect to="/dashboard" />
    )
  } else {
    return (
      <Box textAlign="center" style={{ paddingTop: 40 }}> 
        <Typography variant="h5">
          Welcome to my humble Goal Tracking application. 
          <br />
          Please login to view your goals and do all the things!
        </Typography>
      </Box>
    )
  }
  
}

export default LandingView
