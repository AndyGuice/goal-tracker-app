import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import AddTaskIcon from '@mui/icons-material/AddTask'
import EditIcon from '@mui/icons-material/Edit'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
  StaticTooltipLabel: {
    whiteSpace: 'nowrap',
    // maxWidth: 'none',
  },
}))

const actions = [
  { icon: <PlaylistAddIcon />, name: 'New Goal', route: '/addGoal' },
  { icon: <EditIcon />, name: 'Edit Goals', route: '/editGoals' },
]

export default function ActionSpeedDial(props: any) {
  const { open, onOpen, onClose } = props

  const classes = useStyles()
  const navigate = useNavigate()

  const handleClick = (route: string) => {
    navigate(route)
    onClose()
  }

  return (
    <Box sx={{ height: 100, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="Action Speed Dial"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16
        }}
        icon={<SpeedDialIcon />}
        onClose={onClose}
        onOpen={onOpen}
        open={open}
      >
        {actions.map((action: any) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            classes={{
              staticTooltipLabel: classes.StaticTooltipLabel,
            }}
            onClick={() => handleClick(action.route)}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}
