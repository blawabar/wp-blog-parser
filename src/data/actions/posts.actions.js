import {
  GET_POSTS,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from "data/types";

import { API } from "data/fetch";

export const getPostsRequest = () => ({
  type: GET_POSTS_REQUEST,
});

export const getPostsSuccess = (postData) => ({
  type: GET_POSTS_SUCCESS,
  payload: postData,
});

export const getPostsFailure = (errorInfo) => ({
  type: GET_POSTS_FAILURE,
  payload: errorInfo,
});

export const getPosts = (searchData) => ({
  type: GET_POSTS,
  promise: API.posts.fetchPosts(searchData),
});
