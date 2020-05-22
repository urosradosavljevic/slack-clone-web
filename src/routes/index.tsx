import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from "react-router-dom";
import decode from "jwt-decode";

import { Home } from "./Home";
import { Register } from "./Register";
import { Login } from "./Login";
import { CreateTeam } from "./CreateTeam";

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
                pathname: "/login",
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
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/create-team" exact component={CreateTeam} />
      </Switch>
    </BrowserRouter>
  );
};
