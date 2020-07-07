import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "data/types";

import { API } from "data/fetch";

const getPostsRequest = () => ({
  type: GET_POSTS_REQUEST,
});

const getPostsSuccess = (postData) => ({
  type: GET_POSTS_SUCCESS,
  payload: postData,
});

const getPostsFailure = (errorInfo) => ({
  type: GET_POSTS_FAILURE,
  payload: errorInfo,
});

export const getPosts = (queryData) => async (dispatch) => {
  try {
    dispatch(getPostsRequest());
    const response = await API.post.fetchPosts(queryData);

    if (response.ok) {
      const postData = await response.json();
      dispatch(getPostsSuccess(postData));
    } else {
      const error = await response.json();
      throw new Error(error.toString());
    }
  } catch (error) {
    dispatch(getPostsFailure(error.toString()));
  }
};
