import React from 'react'
import { storiesOf } from '@storybook/react'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import Cards from '../src/Cards'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
})

storiesOf('1: With Client', module)
  .add('default', () => (<ApolloProvider client={client}><Cards /></ApolloProvider>))

// Talk notes: problem with this is that it requires an actual backend call
// So if you're backend is down or slow, 

