import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography
} from "@material-ui/core/";
import "./App.css";

const LOCAL_QUERY = gql`
  {
    characters @client {
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
`;

const CardsLocal = () => {
  const { loading, error, data } = useQuery(LOCAL_QUERY);

  if (loading)
    return (
      <Box justifyContent={"center"} m={3}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  if (error) return <Typography>Error :(</Typography>;
  if (!data) return <Typography>No data available...</Typography>;

  const cardsLocal =
    data &&
    data.characters.results.map((character: any, index: any) => (
      <Card key={index} className="Card">
        <CardContent className="CardContent">
          <img alt={character.name} src={character.image} />
          <Typography>
            <span className="Stat">Name: </span>
            {character.name}
          </Typography>
          <Typography>
            <span className="Stat">Species: </span>
            {character.species}
          </Typography>
          <Typography>
            <span className="Stat">Type: </span>
            {character.type}
          </Typography>
          <Typography>
            <span className="Stat">Origin: </span>
            {character.origin.name}
          </Typography>
          <Typography>
            <span className="Stat">Status: </span>
            {character.status}
          </Typography>
        </CardContent>
      </Card>
    ));

  return (
    <Fragment>
      <Box>Total: {data.characters.info.count}</Box>
      <Box
        display={"inline-flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        m={3}
      >
        {cardsLocal}
      </Box>
    </Fragment>
  );
};

export default CardsLocal;
