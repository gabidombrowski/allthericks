import React from "react"
import { ApolloProvider } from "react-apollo"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { Observable, ApolloLink } from "apollo-link"

const LoadingMockedProvider: React.FunctionComponent = props => {
  const link = new ApolloLink(() => {
    return new Observable(() => { })
  })

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}

export default LoadingMockedProvider