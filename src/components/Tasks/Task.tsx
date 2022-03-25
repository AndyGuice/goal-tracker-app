import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  updateGoal,
  updateGoalTask,
} from '../../store/actions/goals'
import ConfirmDialog from '../Shared/ConfirmDialog/ConfirmDialog'

const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: theme.spacing(1)
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    border: '1px solid black',
    minWidth: '30%',
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  },
  input: {
    padding: theme.spacing(1),
    width: '100%',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}))

function Task(props: any) {
  const {
    goal,
    task,
    date: selectedDate,
  } = props

  const {
    title,
    _id: taskID,
    datesCompleted = [],
  } = task

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [taskTitle, setTaskTitle] = useState(title)
  const [taskComplete, setTaskComplete] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  useEffect(() => {
    if (datesCompleted.includes(selectedDate.toLocaleDateString())) {
      setTaskComplete(true)
    } else {
      setTaskComplete(false)
    }
  }, [selectedDate])

  const handleUpdateTaskState = (isComplete: boolean) => {
    setTaskComplete(isComplete)

    const updatedTask = task

    if (isComplete) {
      updatedTask.datesCompleted = [...datesCompleted, selectedDate.toLocaleDateString()]
    } else {
      const updatedDatesCompleted = updatedTask.datesCompleted.filter(
        (date: any) => (date !== selectedDate)
      )
      updatedTask.datesCompleted = updatedDatesCompleted
    }

    dispatch(updateGoalTask(goal, navigate))
  }

  const deleteTask = (id: any) => {
    const updatedGoal = goal

    const updatedTasks = goal.tasks.filter((t: any) => t._id !== id)
    updatedGoal.tasks = updatedTasks

    dispatch(updateGoal(goal, navigate))
  }

  // const handleDeleteTask = () => {
  //   setOpenConfirmDialog(true)
  // }

  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete) {
      deleteTask(taskID)
      setOpenConfirmDialog(false)
    } else {
      setOpenConfirmDialog(false)
    }
  }

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      className={classes.container}
    >
      <Paper className={classes.paper}>
        <ConfirmDialog
          open={openConfirmDialog}
          onClose={handleDialogClose}
          object="Task"
        />
        <Grid
          item
          xs={12}
        >
          <TextField
            id="Task title"
            aria-label="Task title"
            value={taskTitle}
            size="small"
            multiline
            onChange={(e: any) => setTaskTitle(e.target.value)}
            className={classes.input}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <FormControlLabel
              label="Complete"
              labelPlacement="end"
              control={(
                <Checkbox
                  checked={taskComplete}
                  onClick={() => handleUpdateTaskState(!taskComplete)}
                />
              )}
            />
          </div>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Task
