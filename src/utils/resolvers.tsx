export default {
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
          type: "",
          origin: {
            name: "Earth (C-137)"
          }
        }
      ]
    })
  })
};
