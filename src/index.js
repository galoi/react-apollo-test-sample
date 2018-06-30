import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import User from "./User";

const client = new ApolloClient({
  uri: "" // ここでGraphQL APIのエンドポイントを設定
});

const App = () => (
  <ApolloProvider client={client}>
    <User />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
