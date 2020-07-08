import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CLEAR_POST,
} from "data/types";

const INITIAL_STATE = {
  isLoading: false,
  errorInfo: null,
  postData: null,
  actionStatus: null,
};

export const postReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_REQUEST:
      return { ...state, isLoading: true, postData: null, actionStatus: type };
    case GET_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postData: payload,
        actionStatus: type,
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorInfo: payload,
        actionStatus: type,
      };
    case CLEAR_POST:
      return { ...state, actionStatus: null, postData: null };
    default:
      return state;
  }
};
