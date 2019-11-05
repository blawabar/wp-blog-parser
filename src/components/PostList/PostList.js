import React from "react";

import "./PostList.scss";

import PostItem from "../PostItem/PostItem";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      <h1 className="post-list__heading">Search Results</h1>
      <h2 className="post-list__info">{posts.length} Posts have been found</h2>
      {posts.map(post => (
        <PostItem key={post.ID} {...post} />
      ))}
    </div>
  );
};

export default PostList;
