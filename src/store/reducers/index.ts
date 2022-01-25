import { combineReducers } from 'redux';
import auth from './auth';
import goals from './goals';
import tasks from './tasks';
import error from './error';

export const reducers = combineReducers({ auth, goals, tasks, error });
