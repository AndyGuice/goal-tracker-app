import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

const LandingView = () => {
  const profile = localStorage.getItem('profile')!;
  const navigate = useNavigate();
  const [
    user,
  ] = useState(JSON.parse(profile));

  if (user) {
    navigate('/dashboard');
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
