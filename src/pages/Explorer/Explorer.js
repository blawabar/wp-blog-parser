import React, { useState } from "react";

import "./Explorer.scss";

import SearchForm from "../../components/SearchForm/SearchForm";
import PostList from "../../components/PostList/PostList";

const Explorer = () => {
  const [fetchResult, setFetchResult] = useState({
    isLoading: false,
    data: null,
    error: null
  });

  const createBaseURL = blogDomain =>
    `https://public-api.wordpress.com/rest/v1.1/sites/${blogDomain}/posts/?fields=ID,author,date,modified,title,short_URL,excerpt,attachments`;

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
      // TODO: add an implementation for a ModalWindow
      alert(errors.join("\n"));
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

  const sendRequest = async (url, queryParams, callback) => {
    try {
      setFetchResult({ isLoading: true, data: null, error: null });

      const response = await fetch(`${url}&${queryParams}`);

      if (response.ok) {
        callback();
        const data = await response.json();
        setFetchResult({ isLoading: false, data, error: null });
      } else {
        const error = await response.json();
        setFetchResult({ isLoading: false, data: null, error });
      }
    } catch (error) {
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
        <h1 className="explorer__fetch-info explorer__fetch-info--is-loading">
          Loading data...
        </h1>
      );
    } else {
      if (error) {
        return (
          <h1 className="explorer__fetch-info explorer__fetch-info--has-error">
            Fetch error: {error.message}
          </h1>
        );
      }
      if (data) {
        return <PostList {...data} />;
      }
    }
  };

  return (
    <div className="explorer">
      <SearchForm sendData={sendData} validateForm={validateForm} />
      {renderFetchResults(fetchResult)}
    </div>
  );
};

export default Explorer;
