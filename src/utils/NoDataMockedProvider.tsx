import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Observable, ApolloLink } from "apollo-link";

const NoDataProvider = (props: any) => {
  // This is just a link that swallows all operations and returns the same thing
  // for every request: The specified error.
  const link = new ApolloLink(() => {
    return new Observable(observer => {
      observer.next({
        data: {}
      });
      observer.complete();
    });
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default NoDataProvider;
