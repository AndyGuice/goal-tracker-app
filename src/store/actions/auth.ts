import { AUTH, ERROR } from '../actionTypes/actionTypes';
import * as api from '../../api';

export const signin = (formData: any, navigate: any) => async (dispatch: any) => {
  try {
    const { data } = await api.signIn(formData);

    if (data?.error) {
      dispatch({ type: ERROR, data });
      return navigate('/loginUser');
    }
    dispatch({ type: AUTH, data });

    navigate('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData: any, navigate: any) => async (dispatch: any) => {
  try {
    const { data } = await api.signUp(formData);
    if (data?.error) {
      dispatch({ type: ERROR, data });
      return navigate('/register');
    }
    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
