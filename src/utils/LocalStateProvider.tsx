import React, { ReactNode } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import { printSchema, buildClientSchema } from "graphql";
import introspectionResult from "./schema.json";
import SchemaLink from "apollo-link-schema";

const LocalStateProvider: React.FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any })
  );

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });

  addMockFunctionsToSchema({ schema });

  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link: new SchemaLink({ schema }),
    resolvers: {}
  });

  cache.writeData({
    data: {
      characters: {
        info: {
          count: 3,
          __typename: "Info"
        },
        results: [
          {
            id: 1,
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            name: "Morty Smith",
            species: "Human",
            type: "",
            origin: {
              name: "Earth (C-137)",
              __typename: "Location"
            },
            __typename: "Character"
          },
          {
            id: 2,
            image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg",
            name: "Alien Morty",
            species: "Alien",
            type: "",
            origin: {
              name: "unknown",
              __typename: "Location"
            },
            __typename: "Character"
          },
          {
            id: 3,
            image: "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
            name: "Antenna Morty",
            species: "Human",
            type: "Human with antennae",
            origin: {
              name: "unknown",
              __typename: "Location"
            },
            __typename: "Character"
          }
        ],
        __typename: "Character"
      }
    }
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default LocalStateProvider;
