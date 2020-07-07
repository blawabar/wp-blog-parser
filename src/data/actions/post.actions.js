import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
} from "data/types";

import { API } from "data/fetch";

const getPostRequest = () => ({
  type: GET_POST_REQUEST,
});

const getPostSuccess = (postData) => ({
  type: GET_POST_SUCCESS,
  payload: postData,
});

const getPostFailure = (errorInfo) => ({
  type: GET_POST_FAILURE,
  payload: errorInfo,
});

export const getPost = (siteId, postId) => async (dispatch) => {
  try {
    dispatch(getPostRequest());
    const response = await API.post.fetchPost(siteId, postId);

    if (response.ok) {
      const postData = await response.json();
      dispatch(getPostSuccess(postData));
    } else {
      const error = await response.json();
      throw new Error(error.toString());
    }
  } catch (error) {
    dispatch(getPostFailure(error.toString()));
  }
};
