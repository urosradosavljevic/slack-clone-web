import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";

import { LoginStoreContext, loginData } from "./stores/LoginStore";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
import "mobx-react-lite/batchingForReactDom";

import Routes from "./routes";

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const middlewareLink = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem("token"),
    "x-refresh-token": localStorage.getItem("refreshToken"),
  },
}));

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext();

    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
    return response;
  });
});

const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

const client = new ApolloClient({
  link: httpLinkWithMiddleware,
  cache: new InMemoryCache(),
});

const App = (
  <LoginStoreContext.Provider value={loginData}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </LoginStoreContext.Provider>
);

render(App, document.getElementById("root"));
serviceWorker.unregister();
