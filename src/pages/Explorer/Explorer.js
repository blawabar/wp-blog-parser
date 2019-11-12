import React, { useState, useRef, useEffect } from "react";

import "./Explorer.scss";

import SearchForm from "../../components/SearchForm/SearchForm";
import PostList from "../../components/PostList/PostList";

import Helper from "../../helpers/Helper";

const CACHED_STATE = "fetchState";

const Explorer = () => {
  const [fetchResult, setFetchResult] = useState({
    isLoading: false,
    data: null,
    error: null
  });

  const [isShowingModal, setIsShowingModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const resultRef = useRef(null);

  useEffect(() => {
    const { isLoading, data, error } = fetchResult;

    const isFirstTime = !isLoading && !data && !error;

    // 0. Check if it is first time by assuring that all fetchResult fields are set to null
    if (isFirstTime) {
      // 1. Check session storage
      const cachedState = sessionStorage.getItem(CACHED_STATE);

      // 2. If it has data use it to update state
      if (cachedState) {
        setFetchResult({ ...fetchResult, data: JSON.parse(cachedState) });
      }
    } else if (data) {
      // 3. Persist data into sessionStorage
      sessionStorage.setItem(CACHED_STATE, JSON.stringify(data));
      Helper.scrollToElement(resultRef);
    } else if (error) {
      setIsShowingModal(true);
    }
  }, [fetchResult]);

  const createBaseURL = blogDomain =>
    `https://public-api.wordpress.com/rest/v1.1/sites/${blogDomain}/posts/?fields=ID,site_ID,author,date,modified,title,short_URL,excerpt,attachments`;

  const createQueryParams = (searchPhrase, searchLimit, orderBy) => {
    const queryParams = new URLSearchParams({
      number: searchLimit,
      order_by: orderBy
    });

    if (searchPhrase) {
      queryParams.set("search", searchPhrase);
    }

    return queryParams.toString();
  };

  // TODO: to be moved into SearchForm ??? => START
  const isDomainNameValid = domainName => {
    const regExp = /^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9]+[a-z0-9-]*[a-z0-9]+)*\.[a-z][a-z]*[a-z]$/;
    regExp.test(domainName);

    return (
      regExp.test(domainName) &&
      domainName.length >= 4 &&
      domainName.length <= 100
    );
  };

  const isSearchLimitValid = searchLimit =>
    searchLimit >= 5 && searchLimit <= 100;

  const validateForm = (domain, searchLimit) => {
    const errors = [];

    if (!isDomainNameValid(domain)) {
      errors.push("Please enter a valid domain name (max. 100 chars.)");
    }

    if (!isSearchLimitValid(searchLimit)) {
      errors.push("Please enter a valid search limit (from 5 to 100)");
    }

    if (errors.length) {
      setErrors(errors);
      setIsShowingModal(true);
    }

    return !errors.length;
  };

  // TODO: to be moved into SearchForm ??? <= END

  const sendData = (
    { domain, searchPhrase, searchLimit, orderBy },
    callback
  ) => {
    const baseURL = createBaseURL(domain);
    const queryParams = createQueryParams(searchPhrase, searchLimit, orderBy);

    sendRequest(baseURL, queryParams, callback);
  };

  // TODO: it's a good candidate for a custom hook
  const sendRequest = async (url, queryParams, callback) => {
    try {
      setFetchResult({ isLoading: true, data: null, error: null });

      const response = await fetch(`${url}&${queryParams}`);

      if (response.ok) {
        callback();
        const data = await response.json();
        setFetchResult({ isLoading: false, data, error: null });
      } else {
        callback();
        const error = await response.json();
        setFetchResult({ isLoading: false, data: null, error });
      }
    } catch (error) {
      callback();
      setFetchResult({ isLoading: false, data: null, error });
    }
  };

  const renderFetchResults = ({ isLoading, data, error }) => {
    if (isLoading) {
      return Helper.showInfo("Loading posts data...");
    } else {
      if (error) {
        /* Hmm... I think it will be moved into SearchForm... */
        return Helper.showModal(
          "Fetch error",
          [error.message],
          isShowingModal,
          () => setIsShowingModal(false)
        );
      }
      if (data) {
        return (
          <div ref={resultRef}>
            <PostList {...data} />
          </div>
        );
      }
    }
  };

  return (
    <div className="explorer">
      {/* Hmm... I think it will be moved into SearchForm... */}
      {Helper.showModal("Form Validation Error", [errors], isShowingModal, () =>
        setIsShowingModal(false)
      )}

      <SearchForm sendData={sendData} validateForm={validateForm} />
      {renderFetchResults(fetchResult)}
    </div>
  );
};

export default Explorer;
