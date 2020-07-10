import { GET_POST, GET_POSTS } from "data/types";
import { ActionHandlerFactory } from "utils";

export const promiseMiddleware = () => (next) => async (action) => {
  const { type, promise } = action;

  const typeIsValid = type === GET_POST || type === GET_POSTS;
  const promiseIsValid = promise && typeof promise.then === "function";

  if (typeIsValid && promiseIsValid) {
    let actionHandler;
    try {
      actionHandler = new ActionHandlerFactory(next).getHandler(type);
      actionHandler.handleOnRequest();

      const response = await promise;

      if (response.ok) {
        const responseData = await response.json();
        actionHandler.handleOnSuccess(responseData);
      } else {
        const error = await response.json();
        throw new Error(error.toString());
      }
    } catch (error) {
      actionHandler.handleOnFailure(error.toString());
    }
  } else {
    next(action);
  }
};
