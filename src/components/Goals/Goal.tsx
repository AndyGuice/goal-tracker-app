import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Tasks from '../Tasks/Tasks'

const useStyles = makeStyles((theme: any) => ({
  container: {
    paddingTop: theme.spacing(2)
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    width: '50%',
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
    date,
  } = props

  const {
    title,
    description,
    tasks,
  } = goal

  const classes = useStyles()

  return (
    <>
      <Grid container justifyContent="center" spacing={1} className={classes.container}>
        <Card
          elevation={6}
          className={classes.card}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                id="Goal title"
                aria-label="Goal title"
                align="center"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                id="Goal description"
                aria-label="Goal description"
                align="center"
                variant="subtitle2"
              >
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      {tasks
        && (
          <Tasks
            date={date}
            goal={goal}
            tasks={tasks}
          />
        )}
    </>
  )
}

export default Goal
