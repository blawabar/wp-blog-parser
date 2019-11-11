import React, { useState, useRef, useEffect } from "react";

import "./Explorer.scss";

import ModalPane from "../../components/ModalPane/ModalPane";
import ModalWindow from "../../components/ModalWindow/ModalWindow";

import SearchForm from "../../components/SearchForm/SearchForm";
import PostList from "../../components/PostList/PostList";

const CACHED_STATE = "fetchState";

const Explorer = () => {
  const [fetchResult, setFetchResult] = useState({
    isLoading: false,
    data: null,
    error: null
  });

  const [isShowingModal, setIsShowingModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const loadingRef = useRef(null);
  const errorRef = useRef(null);
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
    } else if (isLoading && loadingRef) {
      loadingRef.current.scrollIntoView({ behavior: "smooth", start: "block" });
    } else if (data && resultRef) {
      // 3. Persist data into sessionStorage
      sessionStorage.setItem(CACHED_STATE, JSON.stringify(data));
      resultRef.current.scrollIntoView({ behavior: "smooth", start: "block" });
    } else if (error && errorRef) {
      errorRef.current.scrollIntoView({ behavior: "smooth", start: "block" });
    }
  }, [fetchResult]);

  const toggleModal = () => setIsShowingModal(!isShowingModal);

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

  const renderFetchResults = ({ isLoading, data, error }) => {
    if (isLoading) {
      return (
        <h1
          ref={loadingRef}
          className="explorer__fetch-info explorer__fetch-info--is-loading"
        >
          Loading data...
        </h1>
      );
    } else {
      if (error) {
        return (
          <h1
            ref={errorRef}
            className="explorer__fetch-info explorer__fetch-info--has-error"
          >
            Fetch error: {error.message}
          </h1>
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
      {isShowingModal && (
        <ModalPane>
          <ModalWindow errorList={errors} toggleModal={toggleModal} />
        </ModalPane>
      )}
      <SearchForm sendData={sendData} validateForm={validateForm} />
      {renderFetchResults(fetchResult)}
    </div>
  );
};

export default Explorer;
