import React from "react";
import { Switch, Route } from "react-router-dom";

import "./PageContainer.scss";

import { Explorer, PostContent } from "pages";

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
