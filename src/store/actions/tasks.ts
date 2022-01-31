import {
  CREATE,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  END_LOADING,
  ERROR,
  // FETCH_ALL,
  // FETCH_TASK,
  FETCH_TASKS,
  START_LOADING,
  // UPDATE_TASK,
  // UPDATE_TASK_SUCCESS
} from "../actionTypes/actionTypes";
import * as api from '../../api';
import TaskModel from '../../types/task';

export const getUserTasks = (goalID: String) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchGoalTasks(goalID);

    console.log('Data: ', data);
    dispatch({ type: FETCH_TASKS, payload: { data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
};

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

    // dispatch({ type: UPDATE_TASK, payload: data });
    // dispatch({ type: UPDATE_TASK_SUCCESS, payload: true });
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

    dispatch({ type: DELETE_TASK, payload: id });
    dispatch({ type: DELETE_TASK_SUCCESS, payload: true });
    dispatch({ type: END_LOADING });

    return history.push(`/goals`);

  } catch (error) {
    console.log(error);
  }
};
