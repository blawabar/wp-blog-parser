import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "data/types";

const INITIAL_STATE = {
  isLoading: false,
  errorInfo: null,
  postListData: null,
  actionStatus: null,
  cachedSearchData: null,
};

export const postsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        postListData: null,
        actionStatus: type,
        cachedSearchData: payload,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postListData: payload,
        actionStatus: type,
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorInfo: payload,
        actionStatus: type,
      };
    default:
      return state;
  }
};
