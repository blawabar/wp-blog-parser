import React, { useState } from "react";

import "./Explorer.scss";

import SearchForm from "../../components/SearchForm/SearchForm";
import PostList from "../../components/PostList/PostList";

const Explorer = () => {
  const [queryData, setQueryData] = useState(null);

  return (
    <div className="explorer">
      <SearchForm setQueryData={setQueryData} />
      <PostList queryData={queryData} />
    </div>
  );
};

export default Explorer;
