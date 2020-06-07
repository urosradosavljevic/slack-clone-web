import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { client } from "./apollo"
import { LoginStoreContext, loginData } from "./stores/LoginStore";
import "semantic-ui-css/semantic.min.css";
import "mobx-react-lite/batchingForReactDom";

import Routes from "./routes";

const App = (
  <LoginStoreContext.Provider value={loginData}>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </LoginStoreContext.Provider>
);

render(App, document.getElementById("root"));
