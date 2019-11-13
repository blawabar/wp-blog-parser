import { useState, useEffect } from "react";

const useFetch = (queryData, isSubmitting, deps) => {
  const [fetchResult, setFetchResult] = useState({
    isLoading: false,
    data: null,
    error: null
  });

  useEffect(() => {
    const sendRequest = async queryData => {
      const { baseURL, queryParams } = queryData || {};

      if (isSubmitting) {
        try {
          setFetchResult({ isLoading: true, data: null, error: null });

          const response = await fetch(`${baseURL}?${queryParams}`);

          if (response.ok) {
            const data = await response.json();
            setFetchResult({ isLoading: false, data, error: null });
          } else {
            const error = await response.json();
            setFetchResult({ isLoading: false, data: null, error });
          }
        } catch (error) {
          setFetchResult({ isLoading: false, data: null, error });
        }
      }
    };
    sendRequest(queryData);
  }, deps);

  return fetchResult;
};

export default useFetch;
