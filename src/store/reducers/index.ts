import { combineReducers } from 'redux'

import auth from './auth'
import error from './error'
import feedback from './feedback'
import goals from './goals'

export const reducers = combineReducers(
  {
    auth,
    error,
    feedback,
    goals
  }
)
