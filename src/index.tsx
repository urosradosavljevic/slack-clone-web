import React, { StrictMode } from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";

import Routes from "./routes";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

const App = (
  <StrictMode>
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  </StrictMode>
);

render(App, document.getElementById("root"));
serviceWorker.unregister();
