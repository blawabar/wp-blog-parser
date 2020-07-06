import React, { useState, useEffect } from "react";

import "./SearchForm.scss";
import { Helper } from "helpers";

const INITIAL_STATE = {
  domain: "",
  searchPhrase: "",
  searchLimit: 5,
  orderBy: "date",
};

const CACHED_STATE = "searchFormState";

const SearchForm = ({ setQueryData }) => {
  const [searchData, setSearchData] = useState(INITIAL_STATE);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const cachedState = sessionStorage.getItem(CACHED_STATE);

    if (cachedState) {
      setSearchData(JSON.parse(cachedState));
    }
  }, []);

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const isDomainNameValid = (domainName) => {
    const regExp = /^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9]+[a-z0-9-]*[a-z0-9]+)*\.[a-z][a-z]*[a-z]$/;
    regExp.test(domainName);

    return (
      regExp.test(domainName) &&
      domainName.length >= 4 &&
      domainName.length <= 100
    );
  };

  const isSearchLimitValid = (searchLimit) =>
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

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    // 0. Get form data for validation
    const { domain, searchPhrase, searchLimit, orderBy } = searchData;

    // 1. Validate form
    const formIsValid = validateForm(domain, searchLimit);

    if (formIsValid) {
      sessionStorage.setItem(CACHED_STATE, JSON.stringify(searchData));
      const baseURL = `https://public-api.wordpress.com/rest/v1.1/sites/${domain}/posts/`;

      const queryParams = Helper.createQueryParams({
        fields:
          "ID,site_ID,author,date,modified,title,short_URL,excerpt,attachments",
        number: searchLimit,
        order_by: orderBy,
        search: searchPhrase,
      });

      setQueryData({ baseURL, queryParams });
    }
  };

  const renderForm = () => (
    <form className="search-form" noValidate onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="domain"
        className="search-form__input-text"
        placeholder="Wordpress domain"
        value={searchData.domain}
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

  return (
    <>
      {renderForm()}
      {Helper.showModal("Form Validation Error", errors, isShowingModal, () =>
        setIsShowingModal(false)
      )}
    </>
  );
};

export default SearchForm;
