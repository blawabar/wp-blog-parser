import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./PostFooter.scss";

const PostFooter = ({ url, onLinkClick }) => {
  return (
    <footer className="post-footer">
      <Link to="/" onClick={onLinkClick}>
        Go to search results
      </Link>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Visit site
      </a>
    </footer>
  );
};

PostFooter.propTypes = {
  url: PropTypes.string,
  onLinkClick: PropTypes.func,
};

export default PostFooter;
