import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((store) => store.auth);

  return (
    <Route
      {...rest}
      render={() =>
        !isLoggedIn ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location.pathname },
            }}
          />
        ) : (
          <Layout>
            <Component {...rest} />
          </Layout>
        )
      }
    />
  );
};

export default PrivateRoute;
