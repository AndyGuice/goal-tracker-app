import { AUTH, ERROR } from '../actionTypes/actionTypes'
import * as api from '../../api'

export const signIn = (formData: any, navigate: any) => async (dispatch: any) => {
  try {
    const { data } = await api.signIn(formData)
    if (data?.error) {
      dispatch({ type: ERROR, data })
      return navigate('/loginUser')
    }
    dispatch({ type: AUTH, data })

    navigate('/goals')
  } catch (error) {
    dispatch({ type: ERROR, error })
  }
}

export const signUp = (formData: any, navigate: any) => async (dispatch: any) => {
  try {
    const { data } = await api.signUp(formData)
    if (data?.error) {
      dispatch({ type: ERROR, data })
      return navigate('/register')
    }
    dispatch({ type: AUTH, data })

    navigate('/goals')
  } catch (error) {
    dispatch({ type: ERROR, error })
  }
}
