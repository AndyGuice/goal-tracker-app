import React, { useState } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddTask from '../Tasks/AddTask'
import Tasks from '../Tasks/Tasks'
import GoalActions from './GoalActions'
import SuccessImage from '../../images/goal_success_image.png'

const useStyles = makeStyles((theme: any) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
    }
  },
}))

function Goal(props: any) {
  const {
    goal,
    configView,
    date,
    onUpdateGoal,
  } = props

  const {
    title,
    tasks,
  } = goal

  const classes = useStyles()
  const [showAddTask, setShowAddTask] = useState(false)

  const handleCancelTask = () => {
    setShowAddTask(false)
  }

  const handleAddTask = () => {
    setShowAddTask(true)
  }

  return (
    <>
      <Card
        elevation={6}
        className={classes.card}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Inspirational goal reaching image thang"
            image={SuccessImage}
            title="Inspirational goal reaching image"
            sx={{
              height: {
                xs: 140,
                sm: 300,
              },
            }}
          />
          <CardContent>
            <Typography align="center">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <GoalActions
          onAddTask={handleAddTask}
          configView={configView}
          goal={goal}
        />
      </Card>
      {showAddTask && (
        <AddTask
          goal={goal}
          onCancel={handleCancelTask}
        />
      )}
      {tasks
        && (
          <Tasks
            configView={configView}
            date={date}
            goal={goal}
            tasks={tasks}
          />
        )}
    </>
  )
}

export default Goal
