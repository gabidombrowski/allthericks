import React from "react";
//import { gql } from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { printSchema, buildClientSchema } from "graphql";
import introspectionResult from "./schema.json";
import mergeResolvers, { CustomResolver } from "./mergeResolvers";
import globalResolvers from "./resolvers";

const AutoMockedProvider: React.FunctionComponent<{
  children: React.ReactNode;
  mockResolvers?: CustomResolver;
}> = ({ children, mockResolvers }) => {
  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any })
  );

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL
  });

  const mergedResolvers = mergeResolvers(globalResolvers, mockResolvers);

  addMockFunctionsToSchema({
    schema,
    mocks: mergedResolvers
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default AutoMockedProvider;
