import React from "react";

import "./Explorer.scss";

import { SearchForm, PostList } from "components";

const Explorer = () => {
  return (
    <div className="explorer">
      <SearchForm />
      <PostList />
    </div>
  );
};

export default Explorer;
