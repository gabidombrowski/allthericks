import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const RICKS = gql`
  {
    characters(page: 1, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        image
        name
        status
        species
        type
        origin {
          name
        }
      }
    }
  }
`;

const Cards = () => {
  const { loading, error, data } = useQuery(RICKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.characters.results.map((character) => (
    <Card className="Card">
      <CardContent className="CardContent">
        <img alt={character.name} src={character.image} />
        <Typography>
          <span className="Stat">Name: </span>
          {character.name}
        </Typography>
        <Typography>
          <span className="Stat">Status: </span>
          {character.status}
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
      </CardContent>
    </Card>
  ));
};

export default Cards;
