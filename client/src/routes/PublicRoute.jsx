import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => {
  return (
    <Route>
      <Layout>
        <Component {...rest} />
      </Layout>
    </Route>
  );
};

export default PublicRoute;
