import {
  CREATE,
  DELETE_GOAL,
  DELETE_GOAL_SUCCESS,
  END_LOADING,
  ERROR,
  FETCH_ALL,
  FETCH_GOAL,
  FETCH_GOALS,
  START_LOADING,
  UPDATE_GOAL,
  UPDATE_GOAL_SUCCESS,
} from '../actionTypes/actionTypes'
import * as api from '../../api'

export const getAllGoals = () => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchAllGoals()
    dispatch({ type: FETCH_ALL, payload: { data } })
    dispatch({ type: END_LOADING })
  }
  catch (error) {
    console.log(error)
  }
}

export const getUserGoals = (userId: String) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchUserGoals(userId)

    dispatch({ type: FETCH_GOALS, payload: { data } })
    dispatch({ type: END_LOADING })
  }
  catch (error) {
    console.log(error)
  }
}

export const getGoal = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchGoal(id)

    dispatch({ type: FETCH_GOAL, payload: { goal: data } })
    dispatch({ type: END_LOADING })
  }
  catch (error) {
    console.log(error)
  }
}

export const createGoal = (goal: any, navigate: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.createGoal(goal)

    if (data?.error) {
      dispatch({ type: ERROR, data })
      return navigate('/addGoal')
    }

    dispatch({ type: END_LOADING })
    dispatch({ type: CREATE, payload: data })
    return navigate('/goals')
  }
  catch (error) {
    console.log(error)
  }
}

export const updateGoal = (goal: any, navigate: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.updateGoal(goal._id, goal)

    if (data?.error) {
      dispatch({ type: ERROR, data })

      return navigate(`/editGoal/${goal._id}`)
    }

    dispatch({ type: UPDATE_GOAL, payload: data })
    dispatch({ type: UPDATE_GOAL_SUCCESS, payload: true })
    dispatch({ type: END_LOADING })

    return navigate('/goals')

  } catch (error) {
    console.log(error)
  }
}

export const updateTaskComplete = (goal: any, navigate: any) => async (dispatch: any) => {

  try {
    const { data } = await api.updateGoal(goal._id, goal)

    if (data?.error) {
      dispatch({ type: ERROR, data })
      return navigate(`/editGoal/${goal._id}`)
    }

    return navigate('/dashboard')

  } catch (error) {
    console.log(error)
  }
}

export const deleteGoal = (id: String, navigate: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING })
    await api.deleteGoal(id)

    dispatch({ type: DELETE_GOAL, payload: id })
    dispatch({ type: DELETE_GOAL_SUCCESS, payload: true })
    dispatch({ type: END_LOADING })

    return navigate('/goals')

  } catch (error) {
    console.log(error)
  }
}
