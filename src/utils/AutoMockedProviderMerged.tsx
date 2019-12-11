import React, { ReactNode } from 'react'
//import { gql } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { printSchema, buildClientSchema } from 'graphql'
import introspectionResult from './schema.json'
import mergeResolvers, { CustomResolver } from "./mergeResolvers"
import globalResolvers from './resolvers'

const AutoMockedProvider: React.FunctionComponent<{
  children: ReactNode
  mockResolvers?: CustomResolver
}> = ({ children, mockResolvers }) => {
  const schemaSDL = printSchema(
    buildClientSchema({ __schema: introspectionResult.__schema as any }),
  )

  const schema = makeExecutableSchema({
    typeDefs: schemaSDL,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  })

  const mergedResolvers = mergeResolvers(globalResolvers, mockResolvers)

  addMockFunctionsToSchema({
    schema,
    mocks: mergedResolvers,
  })

  const client = new ApolloClient({
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  })

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

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AutoMockedProvider