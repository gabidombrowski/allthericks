import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';
import ApolloClient from 'apollo-boost';
import Cards from "./Cards"
import { Box } from '@material-ui/core';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1 className="Title">All the Ricks</h1>
      <Box display={"inline-flex"} flexWrap={"wrap"} justifyContent={"center"} m={3}>
        <Cards />
      </Box>
    </div>
  </ApolloProvider>
);

export default App;
