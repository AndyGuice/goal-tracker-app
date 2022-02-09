import React, { useState, useEffect } from 'react'
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import ConfirmDialog from '../Shared/ConfirmDialog/ConfirmDialog'

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
    onUpdateGoal,
    onUpdateTask,
  } = props

  const {
    title,
    _id: taskID,
    datesCompleted = [],
  } = task

  const classes = useStyles()
  const [taskTitle, setTaskTitle] = useState(title)
  const [taskComplete, setTaskComplete] = useState(false)
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

    onUpdateTask(goal)
  }

  const handleUpdateTaskName = (updatedGoal: any) => {
    onUpdateGoal(updatedGoal)
    setEdit(false)
  }

  const deleteTask = (id: any) => {
    const updatedGoal = goal

    const updatedTasks = goal.tasks.filter((t: any) => t._id !== id)
    updatedGoal.tasks = updatedTasks

    onUpdateGoal(updatedGoal)
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

  return (
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
                justifyContent: 'flex-end',
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
                        onClick={() => handleUpdateTaskName(goal)}
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
  )
}

export default Task
