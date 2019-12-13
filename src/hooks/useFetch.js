/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: null
};

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_INIT":
      return {
        isLoading: true,
        data: null,
        error: null
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      console.error(`Unsuported action type: ${type}`);
      return state;
  }
};

const useFetch = (queryData, isSubmitting, deps) => {
  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);

  useEffect(() => {
    const sendRequest = async queryData => {
      const { baseURL, queryParams } = queryData || {};

      if (isSubmitting) {
        try {
          dispatch({ type: "FETCH_INIT" });
          const response = await fetch(`${baseURL}?${queryParams}`);

          if (response.ok) {
            const data = await response.json();
            dispatch({ type: "FETCH_SUCCESS", payload: data });
          } else {
            const error = await response.json();
            dispatch({ type: "FETCH_FAILURE", payload: error });
          }
        } catch (error) {
          dispatch({ type: "FETCH_FAILURE", payload: error });
        }
      }
    };
    sendRequest(queryData);
  }, deps);

  return state;
};

export default useFetch;
