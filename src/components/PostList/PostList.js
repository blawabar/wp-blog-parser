import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./PostList.scss";

import { Helper } from "utils";
import { PostItem } from "components";

const PostList = ({ isLoading, errorInfo, postListData }) => {
  const resultRef = useRef(null);
  const [isShowingModal, setIsShowingModal] = useState(false);

  useEffect(() => {
    if (postListData) {
      Helper.scrollToElement(resultRef);
    }

    if (errorInfo) {
      setIsShowingModal(true);
    }
  }, [postListData, errorInfo]);

  const renderPostList = (posts) => (
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
  } else if (postListData) {
    content = renderPostList(postListData);
  }

  return content;
};

const mapStateToProps = ({ posts }) => ({ ...posts });

PostList.defaultProps = {
  errorInfo: null,
  postListData: null,
};

PostList.propTypes = {
  isLoading: PropTypes.bool,
  errorInfo: PropTypes.string,
  postListData: PropTypes.array,
};

export default connect(mapStateToProps, null)(PostList);
