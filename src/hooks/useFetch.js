import { useState, useEffect } from "react";

const useFetch = (baseURL, queryParams, isSubmitting, callback) => {
  const [fetchResult, setFetchResult] = useState({
    isLoading: false,
    data: null,
    error: null
  });

  useEffect(() => {
    const sendRequest = async (url, queryParams, callback) => {
      const invokeCallback = () => {
        if (typeof callback === "function") {
          callback();
        }
      };

      if (isSubmitting) {
        try {
          setFetchResult({ isLoading: true, data: null, error: null });

          const response = await fetch(`${url}?${queryParams}`);

          if (response.ok) {
            invokeCallback();

            const data = await response.json();
            setFetchResult({ isLoading: false, data, error: null });
          } else {
            invokeCallback();

            const error = await response.json();
            setFetchResult({ isLoading: false, data: null, error });
          }
        } catch (error) {
          invokeCallback();
          setFetchResult({ isLoading: false, data: null, error });
        }
      }
    };
    sendRequest(baseURL, queryParams, callback);
  }, [baseURL, queryParams, isSubmitting, callback]);

  return fetchResult;
};

export default useFetch;
