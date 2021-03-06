import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_GOAL,
  FETCH_GOALS,
  CREATE,
  DELETE_GOAL,
  DELETE_GOAL_SUCCESS,
  UPDATE_GOAL_SUCCESS,
} from '../actionTypes/actionTypes'

export default (state = { isLoading: true, goals: [] }, action: any) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case FETCH_ALL:
      return {
        ...state,
        goals: action.payload.data,
      }
    case FETCH_GOALS:
      return {
        ...state,
        goals: action.payload.data,
      }
    case FETCH_GOAL:
      return {
        ...state,
        goal: action.payload.goal,
      }
    case CREATE:
      return {
        ...state,
        goals: [...state.goals, action.payload],
      }
    case UPDATE_GOAL_SUCCESS:
      return {
        ...state,
        updateSuccessful: action?.payload,
      }
    case DELETE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal: any) => goal._id !== action.payload),
      }
    case DELETE_GOAL_SUCCESS:
      return {
        ...state,
        deleteSuccessful: action?.payload,
      }
    default:
      return state
  }
}
