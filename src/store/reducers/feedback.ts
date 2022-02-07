import {
  START_LOADING,
  END_LOADING,
  CREATE_FEEDBACK_MESSAGE,
  FETCH_FEEDBACK_MESSAGES,
  FETCH_FEEDBACK_MESSAGE,
  DELETE_FEEDBACK_MESSAGE,
} from '../actionTypes/actionTypes'

export default (state = { isLoading: true, messages: [String] }, action: any) => {
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
    case FETCH_FEEDBACK_MESSAGES:
      return {
        ...state,
        messages: action.payload.data,
      }
    case FETCH_FEEDBACK_MESSAGE:
      return {
        ...state,
        message: action.payload.goal,
      }
    case CREATE_FEEDBACK_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case DELETE_FEEDBACK_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message: any) => message._id !== action.payload),
      }
    default:
      return state
  }
}
