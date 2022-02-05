import React, { useState } from 'react'
import {
  Button,
  Grid,
  Paper,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
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
  },
  input: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    width: '100%',
  }
}))

function AddTask(props: any) {
  const {
    goal, task, onCancel, onUpdate,
  } = props

  const { _id: goalID } = goal || { goal: {} }
  const { title } = task || { title: '' }
  const classes = useStyles()

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

    onUpdate(updatedGoal)
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
        className={classes.input}
      />
      <Grid item textAlign="center" xs={12} sx={{ margin: 1 }}>
        <Button
          id="cancel-task-button"
          aria-label="Cancel task button"
          variant="contained"
          onClick={handleCancel}
          size="small"
          color="error"
          className={classes.input}
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
          className={classes.input}
        >
          Save
        </Button>
      </Grid>
    </Paper>
  )
}

export default AddTask
