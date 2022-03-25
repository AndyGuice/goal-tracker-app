import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import useAuth from '../../hooks/useAuth'
import { getUserGoals } from '../../store/actions/goals'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    padding: theme.spacing(1)
  }
}))

function EditGoals() {
  const {
    goals
  } = useSelector((state: any) => state.goals)

  const [goalOptions, setGoalOptions] = useState(goals)
  const [goalTitle, setGoalTitle] = useState(goals[0].title || '')
  const [goalDescription, setGoalDescription] = useState('')

  const dispatch = useDispatch()
  const classes = useStyles()
  const { user, userId } = useAuth()

  const handleChange = (e: any) => {
    const { title, description } = e.target.value

    setGoalTitle(title)
    setGoalDescription(description)
  }

  useEffect(() => {
    dispatch(getUserGoals(userId))
  }, [user])

  useEffect(() => {
    if (goals && goals.length > 0) {
      setGoalTitle(goals[0].title)
      setGoalDescription(goals[0].description)
    }
  }, [goals])

  return (
    <Grid
      container
      justifyContent="center"
      component="main"
    >
      <form
        // onSubmit={handleSubmit}
        className={classes.paper}
      >
        <Paper
          elevation={6}
          sx={{
            marginTop: 2,
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
            >
              Edit Goals
            </Typography>
            {goals && (
              <Select
                id="goal-select"
                // defaultValue="Select a goal"
                value={goalTitle}
                onChange={handleChange}
                fullWidth
              >
                {goalOptions.map((goal: any) => (
                  <MenuItem value={goal.title} key={goal._id}>
                    {goal.title}
                  </MenuItem>
                ))}
              </Select>
            )}
            {/* <TextField
              id="goal-title-input"
              onChange={(e) => { setGoalTitle(e.target.value) }}
              value={goalTitle}
              // placeholder="Enter goal name"
              fullWidth
            />
            <TextField
              id="goal-description-input"
              onChange={(e) => { setGoalDescription(e.target.value) }}
              value={goalDescription}
              // placeholder="Enter goal description"
              fullWidth
              sx={{
                marginTop: 1
              }}
            /> */}

          </Grid>
        </Paper>
      </form>
    </Grid>
  )
}

export default EditGoals
