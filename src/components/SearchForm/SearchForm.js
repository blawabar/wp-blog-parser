import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./SearchForm.scss";

import { Helper, formValidator } from "utils";
import { getPosts } from "data/actions";

const INITIAL_STATE = {
  domain: "",
  searchPhrase: "",
  searchLimit: 5,
  orderBy: "date",
};

const SearchForm = ({ getPosts, cachedSearchData }) => {
  const [searchData, setSearchData] = useState(
    cachedSearchData || INITIAL_STATE
  );
  const [errors, setErrors] = useState([]);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const handleOnChange = ({ target: { name, value } }) => {
    setSearchData({ ...searchData, [name]: value });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { formIsValid, errors } = formValidator.validateForm(searchData);

    if (formIsValid) {
      getPosts(searchData);
    } else {
      setErrors(errors);
      setIsShowingModal(true);
    }
  };

  const renderForm = ({ domain, searchPhrase, searchLimit, orderBy }) => (
    <form className="search-form" noValidate onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="domain"
        className="search-form__input-text"
        placeholder="Wordpress domain"
        value={domain}
        onChange={handleOnChange}
      />
      <input
        type="text"
        name="searchPhrase"
        className="search-form__input-text"
        placeholder="Search phrase"
        value={searchPhrase}
        onChange={handleOnChange}
      />
      <input
        type="number"
        name="searchLimit"
        className="search-form__input-number"
        placeholder="Limit"
        min="5"
        max="100"
        step="1"
        value={searchLimit}
        onChange={handleOnChange}
      />
      <div className="search-form__input-holder">
        <div className="search-form__select-tip">Sort by: </div>
        <select
          name="orderBy"
          className="search-form__input-select"
          value={orderBy}
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
      {renderForm(searchData)}
      {Helper.showModal("Form Validation Error", errors, isShowingModal, () =>
        setIsShowingModal(false)
      )}
    </>
  );
};

const mapStateToProps = ({ posts: { cachedSearchData } }) => ({
  cachedSearchData,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: (searchData) =>
    searchData ? dispatch(getPosts(searchData)) : null,
});

SearchForm.defaultProps = {
  cachedSearchData: null,
};

SearchForm.propTypes = {
  getPosts: PropTypes.func,
  cachedSearchData: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
