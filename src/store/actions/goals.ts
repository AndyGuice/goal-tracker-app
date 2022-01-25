import {
  CREATE,
  DELETE,
  DELETE_SUCCESSFUL,
  END_LOADING,
  ERROR,
  FETCH_ALL,
  FETCH_GOAL,
  FETCH_GOALS,
  FETCH_GOALS_FOR_TODAY,
  START_LOADING,
  UPDATE,
  UPDATE_SUCCESSFUL
} from "../../constants/actionTypes";
import * as api from '../../api';
import GoalModel from '../../types/goal';

export const getAllGoals = () => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchAllGoals();
    dispatch({ type: FETCH_ALL, payload: { data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
};

export const getUserGoals = (userId: String) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchUserGoals(userId);

    dispatch({ type: FETCH_GOALS, payload: { data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
};

// export const getUserGoalsForToday = (userId: String) => async (dispatch: any) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data: { data } } = await api.fetchUserGoalsForToday(userId, cadence);

//     dispatch({ type: FETCH_GOALS_FOR_TODAY, payload: { data } });
//     dispatch({ type: END_LOADING });
//   }
//   catch (error) {
//     console.log(error);
//   }
// };

export const getGoal = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchGoal(id);

    dispatch({ type: FETCH_GOAL, payload: { goal: data } });
    dispatch({ type: END_LOADING });
  }
  catch (error) {
    console.log(error);
  }
};

export const createGoal = (goal: any, history: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createGoal(goal);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push('/addGoal');
    }

    dispatch({ type: END_LOADING });
    dispatch({ type: CREATE, payload: data });
    return history.push(`/setup`);
  }
  catch (error) {
    console.log(error);
  }
};

export const createRecurringGoal = (goal: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createGoal(goal);

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

export const updateGoal = (goal: any, history: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateGoal(goal._id, goal);

    if (data?.error) {
      dispatch({ type: ERROR, data });

      return history.push(`/editGoal/${goal._id}`);
    }

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: UPDATE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });

    return history.push(`/goals`);

  } catch (error) {
    console.log(error);
  }
};

export const updateGoalComplete = (goal: GoalModel, history: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateGoal(goal._id, goal);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return history.push(`/editGoal/${goal._id}`);
    }

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: UPDATE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const deleteGoal = (id: String, history: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING });
    await api.deleteGoal(id);

    dispatch({ type: DELETE, payload: id });
    dispatch({ type: DELETE_SUCCESSFUL, payload: true });
    dispatch({ type: END_LOADING });

    return history.push(`/setup`);

  } catch (error) {
    console.log(error);
  }
};

