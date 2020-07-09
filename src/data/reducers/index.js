import { combineReducers } from "redux";

import { postReducer } from "./post.reducer";
import { postsReducer } from "./posts.reducer";
import { formReducer } from "./form.reducer";

export const rootReducer = combineReducers({
  post: postReducer,
  posts: postsReducer,
  form: formReducer,
});
