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
} from "../actionTypes/actionTypes";
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

export const updateTask = (task: any, history: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateTask(task._id, task);

    if (data?.error) {
      dispatch({ type: ERROR, data });

      // return history.push(`/editGoal/${task._id}`);
    }

    // dispatch({ type: UPDATE, payload: data });
    // dispatch({ type: UPDATE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });

    // return history.push(`/tasks`);

  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = (id: String, history: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING });
    await api.deleteTask(id);

    // dispatch({ type: DELETE, payload: id });
    // dispatch({ type: DELETE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });

    return history.push(`/setup`);

  } catch (error) {
    console.log(error);
  }
};
