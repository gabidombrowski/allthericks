import React, { ReactNode } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { name, image, random, address } from "faker";

const LocalStateProvider: React.FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    resolvers: []
  });

  const character = {
    id: random.uuid(),
    image: image.imageUrl(310, 310, "cats"),
    name: name.findName(),
    species: random.word(),
    type: random.word(),
    status: random.word(),
    origin: {
      name: address.country(),
      __typename: "Location"
    },
    __typename: "Character"
  };

  const listLength = 3;

  const results = Array(listLength).fill(character);

  cache.writeData({
    data: {
      characters: {
        info: {
          count: listLength,
          __typename: "Info"
        },
        results: results,
        __typename: "Characters"
      }
    }
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default LocalStateProvider;
