import React, { useState } from "react";

import "./Explorer.scss";

const Explorer = () => {
  const [searchState, setSearchState] = useState({
    url: "",
    searchPhrase: "",
    searchLimit: 5,
    orderBy: "date"
  });

  const handleOnSubmit = evt => evt.preventDefault();

  const handleOnChange = evt => {
    const { name, value } = evt.target;
    setSearchState({ ...searchState, [name]: value });
  };

  return (
    <div className="explorer">
      <section className="explorer__search-box">
        <form className="search-form" noValidate onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="url"
            className="search-form__input-text"
            placeholder="Wordpress URL"
            value={searchState.url}
            onChange={handleOnChange}
          />
          <input
            type="text"
            name="searchPhrase"
            className="search-form__input-text"
            placeholder="Serch phrase"
            value={searchState.searchPhrase}
            onChange={handleOnChange}
          />
          <input
            type="number"
            name="searchLimit"
            className="search-form__input-number"
            placeholder="Limit"
            min="5"
            max="100"
            value={searchState.searchLimit}
            onChange={handleOnChange}
          />
          <div className="search-form__input-holder">
            <div className="search-form__select-tip">Sort by: </div>
            <select
              name="orderBy"
              className="search-form__input-select"
              value={searchState.orderBy}
              onChange={handleOnChange}
            >
              <option value="date">Date</option>
              <option value="modified">Modification</option>
              <option value="title">Title</option>
            </select>
          </div>
          <button type="submit" className="search-form__btn">
            Send
          </button>
        </form>
      </section>
      <section className="explorer__results">
        <h1>Results</h1>
      </section>
    </div>
  );
};

export default Explorer;
