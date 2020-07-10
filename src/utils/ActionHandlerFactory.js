import { GET_POSTS, GET_POST } from "data/types";
import * as ACTIONS from "data/actions";

class AbstraActionHandler {
  constructor(next) {
    this._next = next;
  }
}

class PostActionHandler extends AbstraActionHandler {
  handleOnRequest = () => this._next(ACTIONS.getPostRequest());

  handleOnSuccess = (responseData) =>
    this._next(ACTIONS.getPostSuccess(responseData));

  handleOnFailure = (errorInfo) =>
    this._next(ACTIONS.getPostFailure(errorInfo));
}

class PostsActionHandler extends AbstraActionHandler {
  handleOnRequest = () => this._next(ACTIONS.getPostsRequest());

  handleOnSuccess = (responseData) =>
    this._next(ACTIONS.getPostsSuccess(responseData));

  handleOnFailure = (errorInfo) =>
    this._next(ACTIONS.getPostsFailure(errorInfo));
}

class ActionHandlerFactory {
  constructor(next, actionType) {
    if (ActionHandlerFactory.exists) {
      return ActionHandlerFactory.instance;
    }

    const _next = next;
    const _actionType = actionType;

    this.getHandler = () => {
      if (_actionType === GET_POST) {
        return new PostActionHandler(_next);
      }

      if (_actionType === GET_POSTS) {
        return new PostsActionHandler(_next);
      }
    };

    AbstraActionHandler.instance = this;
    AbstraActionHandler.exists = true;

    return this;
  }
}

export default ActionHandlerFactory;
