import React, { useState } from "react";

import "./Explorer.scss";

import { SearchForm, PostList } from "components";

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
