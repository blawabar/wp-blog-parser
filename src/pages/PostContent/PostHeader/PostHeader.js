import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./PostHeader.scss";

import { Helper } from "utils";

const PostHeader = ({
  author: { name: authorName },
  date,
  modified,
  title,
}) => {
  const resultRef = useRef(null);

  useEffect(() => {
    if (resultRef.current) {
      Helper.scrollToElement(resultRef);
    }
  }, []);

  const shortDate = Helper.extractDate(date);
  const shortModified = Helper.extractDate(modified);
  const displayModifed = Helper.datesAreDifferent(shortDate, shortModified);

  return (
    <header className="post-header" ref={resultRef}>
      <h1 className="post-header__title">{Helper.parseTextContent(title)}</h1>
      <ul className="post-header__info-list">
        <li className="post-header__info-item">
          <h3 className="post-header__info-heading">Author</h3>
          <h3 className="post-header__info-text">{authorName}</h3>
        </li>
        <li className="post-header__info-item">
          <h3 className="post-header__info-heading">Published</h3>
          <h3 className="post-header__info-text">{shortDate}</h3>
        </li>
        {displayModifed && (
          <li className="post-header__info-item">
            <h3 className="post-header__info-heading">Last modified</h3>
            <h3 className="post-header__info-text">{shortModified}</h3>
          </li>
        )}
      </ul>
    </header>
  );
};

PostHeader.propTypes = {
  author: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  modfied: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default PostHeader;
