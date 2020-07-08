import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "data/types";

import { API } from "data/fetch";

const getPostsRequest = (searchData) => ({
  type: GET_POSTS_REQUEST,
  payload: searchData,
});

const getPostsSuccess = (postData) => ({
  type: GET_POSTS_SUCCESS,
  payload: postData,
});

const getPostsFailure = (errorInfo) => ({
  type: GET_POSTS_FAILURE,
  payload: errorInfo,
});

export const getPosts = (searchData) => async (dispatch) => {
  try {
    dispatch(getPostsRequest(searchData));
    const response = await API.posts.fetchPosts(searchData);

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
