import React from "react";

import "./PostContent.scss";

const PostContent = props => {
  console.log(props.match.params);

  return (
    <div className="post-content">
      <h1>Post Content</h1>
    </div>
  );
};

export default PostContent;
