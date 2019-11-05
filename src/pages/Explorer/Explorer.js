import React, { useState } from "react";

import "./Explorer.scss";

import SearchForm from "../../components/SearchForm/SearchForm";

// Sekcje Results and Form zostaną rozbite na komponenty

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
      alert(errors.join(""));
    }

    return !errors.length;
  };

  const sendData = ({ domain, searchPhrase, searchLimit, orderBy }) => {
    const baseURL = createBaseURL(domain);
    const queryParams = createQueryParams(searchPhrase, searchLimit, orderBy);

    sendRequest(baseURL, queryParams);
  };

  const sendRequest = async (url, queryParams) => {
    try {
      setFetchResult({ isLoading: true, data: null, error: null });

      const response = await fetch(`${url}&${queryParams}`);

      if (response.ok) {
        const data = await response.json();
        setFetchResult({ ...fetchResult, isLoading: false, data });
        // console.log({ data });
      } else {
        const error = await response.json();
        // console.error({ error });
        setFetchResult({ ...fetchResult, isLoading: false, error });
      }
    } catch (error) {
      console.error({ error });
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

  // to be moved into PostsList
  const renderPostItems = fetchData => {
    const { isLoading, data, error } = fetchData;

    if (isLoading) {
      return <h1>Loading data...</h1>;
    } else {
      if (error) {
        return <h1>An Error has occured: {error}</h1>;
      }
      if (data) {
        return (
          <>
            <h2>Found {data.posts.length} posts:</h2>
            {data.posts.map(
              ({ ID, author, date, modified, title, short_URL, excerpt }) => (
                <div key={ID}>
                  <div>{ID}</div>
                  <p>{author.name}</p>
                  <p>{date}</p>
                  <p>{modified}</p>
                  <p>{title}</p>
                  <p>{short_URL}</p>
                  <p>{excerpt}</p>
                </div>
              )
            )}
          </>
        );
      }
    }
  };

  return (
    <div className="explorer">
      <section className="explorer__search-box">
        <SearchForm sendData={sendData} validateForm={validateForm} />
      </section>
      <section className="explorer__results">
        <h1>Results</h1>
        {renderPostItems(fetchResult)}
      </section>
    </div>
  );
};

export default Explorer;
