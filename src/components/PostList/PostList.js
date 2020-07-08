import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./PostList.scss";

import { Helper } from "utils";
import { PostItem } from "components";

const PostList = ({ isLoading, errorInfo, postData }) => {
  const resultRef = useRef(null);
  const [isShowingModal, setIsShowingModal] = useState(false);

  useEffect(() => {
    if (postData) {
      Helper.scrollToElement(resultRef);
    }

    if (errorInfo) {
      setIsShowingModal(true);
    }
  }, [postData, errorInfo]);

  const renderPostList = ({ posts }) => (
    <div ref={resultRef} className="post-list">
      <h1 className="post-list__heading">Search Results</h1>
      <h2 className="post-list__info">{posts.length} Posts have been found</h2>
      {posts.map((post) => (
        <PostItem key={post.ID} {...post} />
      ))}
    </div>
  );

  const renderErrorMsg = () =>
    Helper.showModal("Fetch error", [errorInfo], isShowingModal, () =>
      setIsShowingModal(false)
    );

  const renderLoadingInfo = () => Helper.showInfo("Loading posts data...");

  let content = null;

  if (errorInfo) {
    content = renderErrorMsg();
  } else if (isLoading) {
    content = renderLoadingInfo();
  } else if (postData) {
    content = renderPostList(postData);
  }

  return content;
};

const mapStateToProps = ({ posts }) => ({ ...posts });

PostList.defaultProps = {
  errorInfo: null,
  postData: null,
};

PostList.propTypes = {
  isLoading: PropTypes.bool,
  errorInfo: PropTypes.string,
  postData: PropTypes.object,
};

export default connect(mapStateToProps, null)(PostList);
