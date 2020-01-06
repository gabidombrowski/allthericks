import React from "react";
//import { gql } from 'apollo-boost'
import { printSchema, buildClientSchema } from "graphql";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import introspectionResult from "./schema.json";

const AutoMockedProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Get Schema with following command:
  //apollo schema:download --endpoint=https://rickandmortyapi.com/graphql/ schema.json

  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any })
  );

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL
  });

  addMockFunctionsToSchema({
    schema
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  //  Useful for testing:

  //   const RICKS_QUERY = gql`
  //   {
  //     characters(page: 1, filter: { name: "rick" }) {
  //       info {
  //         count
  //       }
  //       results {
  //         image
  //         name
  //         species
  //         type
  //         origin {
  //           name
  //         }
  //       }
  //     }
  //   }
  // `

  //   client.query({ query: RICKS_QUERY }).then(result => {
  //     console.log('query: ', RICKS_QUERY)
  //     console.log('result: ', result)
  //   })

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AutoMockedProvider;
