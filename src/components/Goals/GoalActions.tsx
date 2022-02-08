import React, { useState } from 'react'
import {
  CardActions,
  IconButton,
  Tooltip,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { deleteGoal } from '../../store/actions/goals'
import ConfirmDialog from '../Shared/ConfirmDialog/ConfirmDialog'

const useStyles = makeStyles(() => ({
  actions: {}
}))

function GoalActions(props: any) {
  const {
    goal,
    configView,
    onAddTask,
  } = props

  const {
    userId: goalUserID,
    _id: goalID,
  } = goal

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()

  const profile = localStorage.getItem('profile')!
  const loggedUser = JSON.parse(profile)

  const { result } = loggedUser || { result: {} }
  const { googleId, _id } = result || { googleId: {}, _id: {} }
  const userID = googleId || _id

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

  const handleDeleteGoal = () => {
    setOpenConfirmDialog(true)
  }

  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete) {
      dispatch(deleteGoal(goalID, navigate))
      setOpenConfirmDialog(false)
    } else {
      setOpenConfirmDialog(false)
    }
  }

  return (
    loggedUser
    && (
      Object.keys(loggedUser).length !== 0
      && (
        userID === goalUserID
        && (
          configView
          && (
            <CardActions
              className={classes.actions}
            >
              <ConfirmDialog
                open={openConfirmDialog}
                onClose={handleDialogClose}
                object="Goal"
              />
              <Tooltip title="Add task">
                <IconButton
                  aria-label="Add task button"
                  id="Add task button"
                  color="primary"
                  onClick={onAddTask}
                >
                  <AddTaskIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit goal">
                <IconButton
                  aria-label="Edit goal button"
                  id="Edit goal button"
                  onClick={() => navigate(`/editGoal/${goalID}`)}
                  color="primary"
                >
                  <EditRoundedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete goal">
                <IconButton
                  id="Delete goal button"
                  aria-label="Delete goal button"
                  onClick={handleDeleteGoal}
                  color="warning"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          )
        )
      )
    )
  )
}

export default GoalActions
