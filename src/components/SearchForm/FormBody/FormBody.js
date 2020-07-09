import React from "react";
import PropTypes from "prop-types";

import "./FormBody.scss";

const FormBody = ({
  searchData: { domain, searchPhrase, searchLimit, orderBy },
  onSubmit,
  onChange,
}) => {
  return (
    <form className="form-body" noValidate onSubmit={onSubmit}>
      <input
        type="text"
        name="domain"
        className="form-body__input-text"
        placeholder="Wordpress domain"
        value={domain}
        onChange={onChange}
      />
      <input
        type="text"
        name="searchPhrase"
        className="form-body__input-text"
        placeholder="Search phrase"
        value={searchPhrase}
        onChange={onChange}
      />
      <input
        type="number"
        name="searchLimit"
        className="form-body__input-number"
        placeholder="Limit"
        min="5"
        max="100"
        step="1"
        value={searchLimit}
        onChange={onChange}
      />
      <div className="form-body__input-holder">
        <div className="form-body__select-tip">Sort by: </div>
        <select
          name="orderBy"
          className="form-body__input-select"
          value={orderBy}
          onChange={onChange}
        >
          <option value="date">Date</option>
          <option value="modified">Modification</option>
          <option value="title">Title</option>
        </select>
      </div>
      <button type="submit" className="form-body__btn">
        <i className="fas fa-search fa-2x"></i>
      </button>
    </form>
  );
};

FormBody.propTypes = {
  domain: PropTypes.string,
  searchPhrase: PropTypes.string,
  searchLimit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orderBy: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default FormBody;
