import React from 'react'
import { storiesOf } from '@storybook/react'
import { MockedProvider } from '@apollo/react-testing'
import { gql } from 'apollo-boost'
import Cards from '../src/Cards'

const RICKS_QUERY = gql`
  {
    characters(page: 1, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        image
        name
        species
        type
        origin {
          name
        }
      }
    }
  }
`

const mocks = [
  {
    request: {
      query: RICKS_QUERY,
    },
    result: {
      data: {
        characters: {
          info: {
            count: 20,
          },
          results:
            [{
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
              name: 'Rick Sanchez',
              species: 'Human',
              type: '',
              origin: {
                name: 'Earth (C-137)',
              },
            },]
        },
      },
    }
  },
]

storiesOf('2: Mocked Provider', module)
  .add('default', () => (<MockedProvider mocks={mocks} addTypename={false}><Cards /></MockedProvider>))

// Talk notes:
// Add another character (Morty, 2)
// Demo updating Cards component with additional results detail (status)
// Demo removing type

