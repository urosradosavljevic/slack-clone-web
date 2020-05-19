import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { LoginStoreContext, loginData } from "./stores/LoginStore";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
import "mobx-react-lite/batchingForReactDom";

import Routes from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
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
