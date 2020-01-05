import React from "react";
import { storiesOf } from "@storybook/react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Cards from "../src/Cards";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

storiesOf("1: With Client", module).add("default", () => (
  <ApolloProvider client={client}>
    <Cards />
  </ApolloProvider>
));
