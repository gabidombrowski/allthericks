import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import './App.css'
import ApolloClient from 'apollo-boost'
import Cards from './Cards'
import Episodes from './Episodes'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='App'>
      <h1 className='Title'>All the Ricks</h1>
      <Episodes />
      <Cards />
    </div>
  </ApolloProvider>
)

export default App;
