import { combineReducers } from 'redux'
import auth from './auth'
import goals from './goals'
import error from './error'

export const reducers = combineReducers({ auth, goals, error })
