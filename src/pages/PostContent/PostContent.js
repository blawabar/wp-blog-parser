import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./PostContent.scss";

import { Helper } from "utils";
import { getPost } from "data/actions";
import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";
import { PostBody } from "./PostBody";

const PostContent = ({ getPost, isLoading, postData, errorInfo }) => {
  const { siteId, postId } = useParams();
  const history = useHistory();
  const [isShowingModal, setIsShowingModal] = useState(false);

  useEffect(() => {
    getPost(siteId, postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPostContent = (postData) => {
    const { short_URL: url, content, ...headerData } = postData;

    return (
      <div className="post-content">
        <PostHeader {...headerData} />
        <PostBody content={content} />
        <PostFooter url={url} />
      </div>
    );
  };

  let content = null;

  if (isLoading) {
    content = Helper.showInfo("Loading post content...");
  } else if (postData) {
    content = renderPostContent(postData);
  } else if (errorInfo) {
    content = Helper.showModal(
      "Error during fetch",
      [errorInfo],
      isShowingModal,
      () => {
        setIsShowingModal(false);
        history.goBack();
      }
    );
  }

  return content;
};

const mapStateToProps = ({ post }) => ({ ...post });

const mapDispatchToProps = (dispatch) => ({
  getPost: (siteId, postId) => dispatch(getPost(siteId, postId)),
});

PostContent.defaultProps = {
  errorInfo: null,
  postData: null,
};

PostContent.propTypes = {
  getPost: PropTypes.func,
  isLoading: PropTypes.bool,
  postData: PropTypes.object,
  errorInfo: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostContent);
