import React, { useState } from "react";

import "./SearchForm.scss";

const SearchForm = ({ sendData, validateForm }) => {
  const [searchData, setSearchData] = useState({
    domain: "",
    searchPhrase: "",
    searchLimit: 5,
    orderBy: "date"
  });

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
      sendData(searchData);
    }
  };

  return (
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
  );
};

export default SearchForm;
