import {
  START_LOADING,
  END_LOADING,
  // FETCH_ALL,
  // FETCH_TASK,
  FETCH_TASKS,
  CREATE,
  // UPDATE_TASK,
  DELETE_TASK,
  DELETE_TASK_SUCCESS,
  // UPDATE_TASK_SUCCESS
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
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload.data,
      };
    // case FETCH_TASK:
    //   return {
    //     ...state,
    //     goal: action.payload.goal
    //   };
    case CREATE:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    // case UPDATE_TASK_SUCCESS:
    //   return {
    //     ...state,
    //     updateSuccessful: action?.payload
    //   };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task: any) => task._id !== action.payload)
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteSuccessful: action?.payload
      };
    default:
      return state;
  }
};
