import React, { useState, useEffect } from "react";

import "./SearchForm.scss";

const INITIAL_STATE = {
  domain: "",
  searchPhrase: "",
  searchLimit: 5,
  orderBy: "date"
};

const CACHED_STATE = "searchFormState";

const SearchForm = ({ sendData, validateForm }) => {
  const [searchData, setSearchData] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cachedState = sessionStorage.getItem(CACHED_STATE);

    if (cachedState) {
      setSearchData(JSON.parse(cachedState));
    }
  }, []);

  const releaseForm = () => {
    setIsSubmitting(false);
  };

  const handleOnChange = evt => {
    const { name, value } = evt.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    // 0. Get form data for validation
    const { domain, searchLimit } = searchData;

    // 1. Validate form
    const formIsValid = validateForm(domain, searchLimit);

    if (formIsValid) {
      sessionStorage.setItem(CACHED_STATE, JSON.stringify(searchData));
      setIsSubmitting(true);
      sendData(searchData, releaseForm);
    }
  };

  return (
    <form className="search-form" noValidate onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="domain"
        className="search-form__input-text"
        placeholder="Wordpress domain"
        value={searchData.domain}
        onChange={handleOnChange}
        disabled={isSubmitting}
      />
      <input
        type="text"
        name="searchPhrase"
        className="search-form__input-text"
        placeholder="Search phrase"
        value={searchData.searchPhrase}
        onChange={handleOnChange}
        disabled={isSubmitting}
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
        disabled={isSubmitting}
      />
      <div className="search-form__input-holder">
        <div className="search-form__select-tip">Sort by: </div>
        <select
          name="orderBy"
          className="search-form__input-select"
          value={searchData.orderBy}
          onChange={handleOnChange}
          disabled={isSubmitting}
        >
          <option value="date">Date</option>
          <option value="modified">Modification</option>
          <option value="title">Title</option>
        </select>
      </div>
      <button
        type="submit"
        className="search-form__btn"
        disabled={isSubmitting}
      >
        <i className="fas fa-search fa-2x"></i>
      </button>
    </form>
  );
};

export default SearchForm;
