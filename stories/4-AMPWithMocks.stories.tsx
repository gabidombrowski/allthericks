import React from "react";
import { storiesOf } from "@storybook/react";
import Cards from "../src/Cards";
import AutoMockedProvider from "../src/utils/AutoMockedProvider";
//import { name } from "faker"
//import { MockList } from "graphql-tools";

const mockResolvers = {
  Query: () => ({
    characters: () => ({
      info: () => ({
        count: 1
      }),
      results: () => [
        {
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          name: "Rick Sanchez",
          species: "Human",
          origin: {
            name: "Earth (C-137)"
          },
          location: {
            name: "Earth (Replacement Dimension)"
          }
        }
      ]
    })
  })
};

// const listLength = 3;

// const mockResolvers = {
//   Query: () => ({
//     characters: () => ({
//       info: () => ({
//         count: listLength
//       }),
//       results: () => new MockList(listLength)
//     })
//   })
// };

storiesOf("4: AMP with mocks", module).add("default", () => (
  <AutoMockedProvider mockResolvers={mockResolvers}>
    <Cards />
  </AutoMockedProvider>
));
