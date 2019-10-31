import React from "react";

import { Switch, Route } from "react-router-dom";

import Explorer from "../../pages/Explorer/Explorer";
import PostContent from "../../pages/PostContent/PostContent";

const PageContainer = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Explorer} />
        <Route exact path="/:postId" component={PostContent} />
      </Switch>
    </>
  );
};

export default PageContainer;
