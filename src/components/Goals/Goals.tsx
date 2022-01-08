import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  CircularProgress,
  Grow,
  Paper,
  Button,
  Container,
  Snackbar
} from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router';
import { getAllGoals, getUserGoals } from '../../actions/goals';
import GoalModel from '../../models/goal';
import Goal from './Goal';
import { DELETE_SUCCESSFUL, UPDATE_SUCCESSFUL } from '../../constants/actionTypes';
import Alert from '../Helpers/Alert';

const Goals = () => {
  const {
    goals,
    isLoading,
    updateSuccessful,
    deleteSuccessful
  } = useSelector((state: any) => state.goals);

  const { addAnswerSuccessful } = useSelector((state: any) => state.answers);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = localStorage.getItem('profile')!;

  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showAddAnswerSuccess, setShowAddAnswerSuccess] = useState(false);
  const [user, setUser] = useState(JSON.parse(profile));

  useEffect(() => {
    if (updateSuccessful) {
      setShowEditSuccess(true);
    }
  }, [updateSuccessful]);

  useEffect(() => {
    if (deleteSuccessful) {
      setShowDeleteSuccess(deleteSuccessful);
    }
  }, [deleteSuccessful]);


  useEffect(() => {
    if (addAnswerSuccessful) {
      setShowAddAnswerSuccess(addAnswerSuccessful);
    }
  }, [addAnswerSuccessful]);

  // useEffect(() => {
  //   dispatch(getAllGoals());
  // }, [dispatch]);

  useEffect(() => {
    const { result } = user || { user: {} };
    console.log("Result: ", result);

    const userId = result?.googleId || result?._id;

    console.log("UserID: ", userId);

    dispatch(getUserGoals(userId));
  }, [dispatch]);

  const handleCloseEditSuccess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: UPDATE_SUCCESSFUL, payload: false });
    setShowEditSuccess(false);
  };

  const handleCloseDeleteSuccess = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: DELETE_SUCCESSFUL, payload: false });
    setShowDeleteSuccess(false);
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      {user?.result &&
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addGoal")}
        >
          Add goal
        </Button>
      }
      {isLoading ?
        <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em" color="primary" value={100} />
        </Paper>
        :
        <Grow in={true} timeout={{ enter: 1500 }}>
          <Grid container spacing={3}>
            {
              goals?.map((goal: GoalModel, index: number) => (
                <Goal goal={goal} key={index} />
              ))
            }
          </Grid>
        </Grow>
      }
      <Snackbar
        open={showEditSuccess}
        autoHideDuration={6000}
        onClose={handleCloseEditSuccess}
      >
        <Alert
          onClose={handleCloseEditSuccess}
          severity="success"
        >
          Edit successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={showDeleteSuccess}
        autoHideDuration={6000}
        onClose={handleCloseDeleteSuccess}
      >
        <Alert
          onClose={handleCloseDeleteSuccess}
          severity="success"
        >
          Delete successful
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Goals;
