import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CLEAR_POST,
  GET_POST,
} from "data/types";

import { API } from "data/fetch";

export const getPostRequest = () => ({
  type: GET_POST_REQUEST,
});

export const getPostSuccess = (postData) => ({
  type: GET_POST_SUCCESS,
  payload: postData,
});

export const getPostFailure = (errorInfo) => ({
  type: GET_POST_FAILURE,
  payload: errorInfo,
});

export const getPost = (siteId, postId) => ({
  type: GET_POST,
  promise: API.post.fetchPost(siteId, postId),
});

export const clearPost = () => ({ type: CLEAR_POST });
