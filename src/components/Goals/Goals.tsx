import React from 'react'
import Goal from './Goal'
import GoalModel from '../../types/goal';
import useStyles from './styles';
import {
  Grid,
  Typography
} from '@material-ui/core'

const Goals = (props: any) => {
  const { cadence, goals } = props
  const classes = useStyles();

  return (
    <>
     <Grid item xs={12}>
      <Typography 
        variant="h5"
        className={classes.goalGroupHeader}
      >
        {cadence}
      </Typography>
    </Grid>
    {
      goals?.map((goal: GoalModel, index: number) => {
        if (cadence === goal.cadence) {
        return (
          <div key={index} className={classes.goal}>
            <Goal goal={goal} setupView={false} />
          </div>
        )}
      })
    }
    </>
  )
}

export default Goals

