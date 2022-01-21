import React, { useState, useEffect } from 'react';
import Goal from './Goal';
import GoalModel from '../../types/goal';
import useStyles from './styles';

import {
  Grid,
  Typography
} from '@material-ui/core';

const Goals = (props: any) => {
  const { goals, setupView } = props;
  const classes = useStyles();

  const [dailyGoals, setDailyGoals] = useState<GoalModel[]>([]);
  const [weeklyGoals, setWeeklyGoals] = useState<GoalModel[]>([]);
  const [monthlyGoals, setMonthlyGoals] = useState<GoalModel[]>([]);

  const organizeGoalsByCadence = (goals: GoalModel[]) => {
    const dailyGoalList = [];
    const weeklyGoalList = [];
    const monthlyGoalList = [];

    {
      goals.map((goal: GoalModel) => {
        const { cadence } = goal;
        if (cadence === 'daily') {
          dailyGoalList.push(goal);
        }
        if (cadence === 'weekly') {
          weeklyGoalList.push(goal);
        }
        if (cadence === 'monthly') {
          monthlyGoalList.push(goal);
        }
      });
    };

    setDailyGoals(dailyGoalList);
    setWeeklyGoals(weeklyGoalList);
    setMonthlyGoals(monthlyGoalList);
  };

  useEffect(() => {
    if (goals) {
      organizeGoalsByCadence(goals);
    }
  }, [goals]);

  return (
    <>
      {dailyGoals && (dailyGoals.length > 0) && (
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className={classes.goalGroupHeader}
            align="center"
          >
            Daily Goals
          </Typography>
          {dailyGoals.map((goal: GoalModel, index: number) => (
            <Goal key={index} goal={goal} setupView={setupView} />
          ))}
        </Grid>
      )}
      {weeklyGoals && (weeklyGoals.length > 0) && (
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className={classes.goalGroupHeader}
            align="center"
          >
            Weekly Goals
          </Typography>
          {weeklyGoals.map((goal: GoalModel, index: number) => (
            <Goal key={index} goal={goal} setupView={setupView} />
          ))}
        </Grid>
      )}
      {monthlyGoals && (monthlyGoals.length > 0) && (
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className={classes.goalGroupHeader}
            align="center"
          >
            Monthly Goals
          </Typography>

          {monthlyGoals.map((goal: GoalModel, index: number) => (
            <Goal key={index} goal={goal} setupView={setupView} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Goals;

