import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";

// http server link
const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

// link for inserting token from local storage into request header
const middlewareLink = setContext(() => ({
  headers: {
    "x-token": localStorage.getItem("token"),
    "x-refresh-token": localStorage.getItem("refreshToken"),
  },
}));

// link for getting tokens from response header and setting them into local storage
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

// links concatenation
const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

// web socket subscription link
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem("token"),
      refreshToken: localStorage.getItem("refreshToken"),
    },
  },
});

// splitting each operation
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinkWithMiddleware
);

// client  export and setup
export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
