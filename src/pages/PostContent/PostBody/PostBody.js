import React from "react";
import PropTypes from "prop-types";

import "./PostBody.scss";

import { Helper } from "utils";

const PostBody = ({ content }) => {
  return (
    <section
      className="post-body"
      dangerouslySetInnerHTML={Helper.parseHTMLContent(content)}
    ></section>
  );
};

PostBody.propTypes = {
  content: PropTypes.string,
  resultRef: PropTypes.any,
};

export default PostBody;
