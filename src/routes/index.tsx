import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import decode from "jwt-decode";

import * as routes from "../constants/routes";

import { WelcomePage } from "./WelcomePage";
import { Register } from "./Register";
import { Login } from "./Login";
import { CreateTeam } from "./CreateTeam";
import { Home } from "./Home/Home";
import { Error } from "./Error";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    if (token && refreshToken) {
      decode(token);
      decode(refreshToken);
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    component={
      isAuthenticated()
        ? Component
        : () => (
          <Redirect
            to={{
              pathname: routes.LOGIN_ROUTE,
            }}
          />
        )
    }
  />
);

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.WELCOME_ROUTE} exact component={WelcomePage} />
        <Route path={routes.REGISTER_ROUTE} exact component={Register} />
        <Route path={routes.LOGIN_ROUTE} exact component={Login} />
        <PrivateRoute
          path={routes.TEAM_ROUTE}
          exact
          component={Home}
        />
        <PrivateRoute path={routes.CREATE_TEAM_ROUTE} exact component={CreateTeam} />
        <Route path={routes.ERROR_ROUTE} component={() => <Error errors={["404", "This page doesn't exists"]} />} />
      </Switch>
    </BrowserRouter>
  );
};
