import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { gql } from "apollo-boost";
import Cards from "../src/Cards";

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
        origin {
          name
        }
        location {
          name
        }
        type
      }
    }
  }
`;

const mocks = [
  {
    request: {
      query: RICKS_QUERY
    },
    result: {
      data: {
        characters: {
          info: {
            count: 2
          },
          results: [
            {
              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
              name: "Rick Sanchez",
              species: "Human",
              origin: {
                name: "Earth (C-137)"
              },
              location: {
                name: "Earth (Replacement Dimension)"
              },
              type: ""
            },
            {
              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
              name: "Morty Sanchez",
              species: "Human",
              origin: {
                name: "Earth (C-137)"
              },
              location: {
                name: "Earth (Replacement Dimension)"
              },
              type: ""
            }
          ]
        }
      }
    }
  }
];

storiesOf("2: Mocked Provider", module).add("default", () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <Cards />
  </MockedProvider>
));
