import {
  START_LOADING,
  END_LOADING,
  // FETCH_ALL,
  // FETCH_GOAL,
  // FETCH_GOALS,
  // FETCH_GOALS_FOR_TODAY,
  CREATE,
  // UPDATE,
  // DELETE,
  DELETE_SUCCESSFUL,
  // UPDATE_SUCCESSFUL
} from '../actionTypes/actionTypes';

export default (state = { isLoading: true, tasks: [] }, action: any) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false
      };
    // case FETCH_ALL:
    //   return {
    //     ...state,
    //     goals: action.payload.data,
    //   };
    // case FETCH_GOALS:
    //   return {
    //     ...state,
    //     goals: action.payload.data,
    //   };
    // case FETCH_GOALS_FOR_TODAY:
    //   return {
    //     ...state,
    //     goals: action.payload.data,
    //   };
    // case FETCH_GOAL:
    //   return {
    //     ...state,
    //     goal: action.payload.goal
    //   };
    case CREATE:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    // case UPDATE_SUCCESSFUL:
    //   return {
    //     ...state,
    //     updateSuccessful: action?.payload
    //   };
    // case DELETE:
    // return {
    //   ...state,
    //   goals: state.goals.filter((goal: any) => goal._id !== action.payload)
    // };
    case DELETE_SUCCESSFUL:
      return {
        ...state,
        deleteSuccessful: action?.payload
      };
    default:
      return state;
  }
};
