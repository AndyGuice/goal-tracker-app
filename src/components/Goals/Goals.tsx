import React from 'react';
import Goal from './Goal';
import GoalModel from '../../types/goal';
// import useStyles from './styles';

import {
  Grid,
  // Typography
} from '@material-ui/core';

const Goals = (props: any) => {
  const { goals, configView } = props;
  // const classes = useStyles();

  return (
    <>
      {goals && (goals.length > 0) && (
        <Grid item xs={12}>
          {goals.map((goal: GoalModel, index: number) => (
            <Goal
              key={index}
              goal={goal}
              configView={configView}
            />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Goals;

