import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import useStyles from './styles';
import AddTask from '../Tasks/AddTask';
import Tasks from '../Tasks/Tasks';
import GoalActions from './GoalActions';
import SuccessImage from '../../images/goal_success_image.png';

const Goal = (props: any) => {
  const {
    goal,
    configView,
    date,
    onUpdate
  } = props;

  const {
    title,
    tasks,
  } = goal;

  const classes = useStyles();
  const [showAddTask, setShowAddTask] = useState(false);

  const handleCancelTask = () => {
    setShowAddTask(false);
  };

  const handleAddTask = () => {
    setShowAddTask(true);
  };

  return (
    <>
      <Card className={classes.paper} elevation={6}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Inspirational goal reaching image thang"
            image={SuccessImage}
            title="Inspirational goal reaching image"
            sx={{
              height: {
                xs: 140,
                sm: 300
              }
            }}
          />
          <CardContent>
            <Typography className={classes.title} align="center">
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
          onUpdate={onUpdate}
        />
      )}
      {tasks && (
        <Tasks
          configView={configView}
          date={date}
          goal={goal}
          tasks={tasks}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default Goal;
