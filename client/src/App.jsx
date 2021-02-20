import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/Routes";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import VerticalLayout from "./components/verticalLayout";
import NonAuthLayout from "./components/NonAuthLayout";
import store from "./store/store";
import { loadUser } from "./store/actions/authActions";
import "./assets/scss/theme.scss";
import "toastr/build/toastr.min.css";
import "./App.css";

const App = () => {
  store.dispatch(loadUser());

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <PublicRoute
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
            />
          ))}

          {privateRoutes.map((route, idx) => (
            <PrivateRoute
              path={route.path}
              layout={VerticalLayout}
              component={route.component}
              allowed={route.allowed}
              key={idx}
              exact
            />
          ))}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
