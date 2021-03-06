import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { updateGoal } from '../../store/actions/goals'
import TaskModel from '../../types/task'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    border: '1px solid black',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  }
}))

function AddTask(props: any) {
  const {
    goal, task, onCancel,
  } = props

  const { _id: goalID } = goal || { goal: {} }
  const { title } = task || { title: '' }

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [taskTitle, setTaskTitle] = useState(title)

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newTask = new TaskModel()
    const today = new Date().toISOString()

    newTask.title = taskTitle.trim()
    newTask.createdOn = today
    newTask.updatedOn = today
    newTask.goalId = goalID

    const updatedGoal = goal
    updatedGoal.tasks.push(newTask)

    dispatch(updateGoal(goal, navigate))
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Paper className={classes.paper}>
      <TextField
        id="new task title"
        aria-label="New task title"
        label="Title"
        value={taskTitle}
        variant="outlined"
        size="small"
        onChange={(e: any) => setTaskTitle(e.target.value)}
        fullWidth
      />
      <Grid item textAlign="center" xs={12} sx={{ margin: 1 }}>
        <Button
          id="cancel-task-button"
          aria-label="Cancel task button"
          variant="contained"
          onClick={handleCancel}
          size="small"
          color="error"
        >
          Cancel
        </Button>
        <Button
          id="save-task-button"
          aria-label="Save task button"
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          size="small"
        >
          Save
        </Button>
      </Grid>
    </Paper>
  )
}

export default AddTask
