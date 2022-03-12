import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import { calculateConsecutiveDays, generateStreakVerbiage } from '../../helpers/tasks'
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
    // marginTop: theme.spacing(1),
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
    configView,
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
  const [currentStreak, setCurrentStreak] = useState(0)
  const [edit, setEdit] = useState(false)

  const profile = localStorage.getItem('profile')!
  const loggedUser = JSON.parse(profile)

  useEffect(() => {
    if (datesCompleted.includes(selectedDate)) {
      setTaskComplete(true)
    } else {
      setTaskComplete(false)
    }
  }, [selectedDate])

  useEffect(() => {
    setCurrentStreak(calculateConsecutiveDays(task))
  }, [selectedDate, task, taskComplete])

  const handleUpdateTaskState = (status: boolean) => {
    setTaskComplete(status)

    const updatedTask = task

    if (status) {
      updatedTask.datesCompleted = [...datesCompleted, selectedDate]
    } else {
      const updatedDatesCompleted = updatedTask.datesCompleted.filter(
        (date: any) => (date !== selectedDate),
      )
      updatedTask.datesCompleted = updatedDatesCompleted
    }

    dispatch(updateGoalTask(goal, navigate))
  }

  const handleUpdateTaskName = () => {

    const updatedTask = task
    updatedTask.title = taskTitle

    dispatch(updateGoalTask(goal, navigate))
    setEdit(false)
  }

  const deleteTask = (id: any) => {
    const updatedGoal = goal

    const updatedTasks = goal.tasks.filter((t: any) => t._id !== id)
    updatedGoal.tasks = updatedTasks

    dispatch(updateGoal(goal, navigate))
  }

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const handleDeleteTask = () => {
    setOpenConfirmDialog(true)
  }

  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete) {
      deleteTask(taskID)
      setOpenConfirmDialog(false)
    } else {
      setOpenConfirmDialog(false)
    }
  }

  const streakVerbiage = generateStreakVerbiage(currentStreak)

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
            disabled={!edit}
            onChange={(e: any) => setTaskTitle(e.target.value)}
            className={classes.input}
          />
          {
            !configView
            && (
              <div
                style={{
                  display: 'flex',
                  paddingRight: 5,
                }}
              >
                <FormControlLabel
                  label="Complete"
                  labelPlacement="start"
                  control={(
                    <Checkbox
                      checked={taskComplete}
                      onClick={() => handleUpdateTaskState(!taskComplete)}
                    />
                  )}
                />
              </div>
            )
          }
          {
            loggedUser
            && (
              Object.keys(loggedUser).length !== 0
              && (
                configView
                && (
                  <Grid
                    item
                    xs={12}
                    className={classes.actionButtons}
                  >
                    <IconButton
                      title="Edit task"
                      aria-label="Edit task button"
                      color="primary"
                      onClick={() => setEdit(!edit)}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    {
                      edit ? (
                        <IconButton
                          title="Save task edit"
                          aria-label="Save task edit button"
                          onClick={handleUpdateTaskName}
                          color="secondary"
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          title="Delete task"
                          aria-label="Delete task"
                          onClick={handleDeleteTask}
                          color="warning"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                  </Grid>
                )
              )
            )
          }
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Task
