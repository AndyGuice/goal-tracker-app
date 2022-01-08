import { combineReducers } from 'redux';
import auth from './auth';
import forms from './forms';
import goals from './goals';
import answers from './answers';
import error from './error';

export const reducers = combineReducers({ auth, forms, goals, answers, error });
