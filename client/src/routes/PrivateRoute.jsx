import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  admin,
  ...rest
}) => {
  const location = useLocation();
  const { isLoggedIn, user } = useSelector((store) => store.auth);

  if (admin && user.role !== "admin") {
    return <Redirect to="/" />;;
  }

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
