import {
  CREATE,
  // DELETE,
  // DELETE_SUCCESSFUL,
  END_LOADING,
  ERROR,
  // FETCH_ALL,
  // FETCH_GOAL,
  // FETCH_GOALS,
  // FETCH_GOALS_FOR_TODAY,
  START_LOADING,
  // UPDATE,
  // UPDATE_SUCCESSFUL
} from "../../constants/actionTypes";
import * as api from '../../api';
import TaskModel from '../../types/task';

export const createTask = (task: TaskModel) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createTask(task);

    if (data?.error) {
      dispatch({ type: ERROR, data });
    }

    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE, payload: data });
  }
  catch (error) {
    console.log(error);
  }
};
