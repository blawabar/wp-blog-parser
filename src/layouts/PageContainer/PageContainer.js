import React from "react";
import { Switch, Route } from "react-router-dom";

import "./PageContainer.scss";

import Explorer from "../../pages/Explorer/Explorer";
import PostContent from "../../pages/PostContent/PostContent";
// it must have at least height of 100vh - (Header + Footer)
const PageContainer = () => {
  return (
    <div className="page-container">
      <Switch>
        <Route exact path="/" component={Explorer} />
        <Route exact path="/:siteId/:postId" component={PostContent} />
      </Switch>
    </div>
  );
};

export default PageContainer;
