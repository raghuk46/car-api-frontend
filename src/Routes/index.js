import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthVerify, Auth, Home, NotFound } from "../Containers";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={AuthVerify} />
      <Route exact path="/auth" component={Auth} />
      <Route exact path="/app" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default Routes;
