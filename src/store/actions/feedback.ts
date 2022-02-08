import {
  ERROR,
  START_LOADING,
  END_LOADING,
  CREATE_FEEDBACK_MESSAGE,
  FETCH_FEEDBACK_MESSAGES,
  FETCH_FEEDBACK_MESSAGE,
  DELETE_FEEDBACK_MESSAGE,
} from '../actionTypes/actionTypes'
import * as api from '../../api'

export const getAllFeedbackMessages = () => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING })
    const { data: { data } } = await api.fetchAllFeedback()
    dispatch({ type: FETCH_FEEDBACK_MESSAGES, payload: { data } })
    dispatch({ type: END_LOADING })
  }
  catch (error) {
    dispatch({ type: ERROR, error })
  }
}

export const getFeedbackMessage = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchFeedback(id)

    dispatch({ type: FETCH_FEEDBACK_MESSAGE, payload: { goal: data } })
    dispatch({ type: END_LOADING })
  }
  catch (error) {
    dispatch({ type: ERROR, error })
  }
}

export const createFeedbackMessage = (message: any, navigate: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.createFeedback(message)

    if (data?.error) {
      dispatch({ type: ERROR, data })
      return navigate('/addFeedbackMessage')
    }

    dispatch({ type: END_LOADING })
    dispatch({ type: CREATE_FEEDBACK_MESSAGE, payload: data })
    return navigate('/dashboard')
  }
  catch (error) {
    dispatch({ type: ERROR, error })
  }
}

export const deleteFeedbackMessage = (id: String, navigate: any) => async (dispatch: any) => {

  try {
    dispatch({ type: START_LOADING })
    await api.deleteFeedback(id)

    dispatch({ type: DELETE_FEEDBACK_MESSAGE, payload: id })
    dispatch({ type: END_LOADING })

    return navigate('/dashboard')

  } catch (error) {
    dispatch({ type: ERROR, error })
  }
}
