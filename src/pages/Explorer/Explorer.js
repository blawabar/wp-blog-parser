import React, { useState } from "react";

import "./Explorer.scss";

// Sekcje Results and Form zostaną rozbite na komponenty

const Explorer = () => {
  const [searchData, setsearchData] = useState({
    domain: "",
    searchPhrase: "",
    searchLimit: 5,
    orderBy: "date"
  });

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

  const handleOnSubmit = evt => {
    evt.preventDefault();

    // 0. Get form data
    const { domain, searchPhrase, searchLimit, orderBy } = searchData;
    // console.log({ domain, searchPhrase, searchLimit, orderBy });

    if (!isDomainNameValid(domain)) {
      alert("Please enter a valid domain name - max. 100 chars");
      return;
    }

    // 2. Validate searchLimit for the range 5 - 100,
    if (!isSearchLimitValid(searchLimit)) {
      alert("Please provide a valid search value from 5 to 100");
      return;
    }

    // 3. Send request - it should be moved into the sendRequest method
    // - prepare base url,
    const baseURL = createBaseURL(domain);
    // - create queryParams
    const queryParams = createQueryParams(searchPhrase, searchLimit, orderBy);

    sendRequest(baseURL, queryParams); // it should accept searchData as the parameter
  };

  const handleOnChange = evt => {
    const { name, value } = evt.target;
    setsearchData({ ...searchData, [name]: value });
  };

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
        <form className="search-form" noValidate onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="domain"
            className="search-form__input-text"
            placeholder="Wordpress domain"
            value={searchData.url}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="searchPhrase"
            className="search-form__input-text"
            placeholder="Search phrase"
            value={searchData.searchPhrase}
            onChange={handleOnChange}
          />
          <input
            type="number"
            name="searchLimit"
            className="search-form__input-number"
            placeholder="Limit"
            min="5"
            max="100"
            value={searchData.searchLimit}
            onChange={handleOnChange}
          />
          <div className="search-form__input-holder">
            <div className="search-form__select-tip">Sort by: </div>
            <select
              name="orderBy"
              className="search-form__input-select"
              value={searchData.orderBy}
              onChange={handleOnChange}
            >
              <option value="date">Date</option>
              <option value="modified">Modification</option>
              <option value="title">Title</option>
            </select>
          </div>
          <button type="submit" className="search-form__btn">
            <i className="fas fa-search fa-2x"></i>
          </button>
        </form>
      </section>
      <section className="explorer__results">
        <h1>Results</h1>
        {renderPostItems(fetchResult)}
      </section>
    </div>
  );
};

export default Explorer;
