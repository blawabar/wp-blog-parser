import { GET_POST_SUCCESS, GET_POSTS_SUCCESS } from "data/types";

export const normalizerMiddleware = () => (next) => (action) => {
  const { type, payload } = action;

  if (type === GET_POSTS_SUCCESS) {
    const { posts } = payload;

    return next({ type, payload: posts || [] });
  }

  if (type === GET_POST_SUCCESS) {
    const {
      author: { name: authorName },
      short_URL: url,
      ...rest
    } = payload;

    return next({ type, payload: { authorName, url, ...rest } });
  }

  next(action);
};
