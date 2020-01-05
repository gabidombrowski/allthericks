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

const RICKS_EPISODES_QUERY = gql`
  {
    episodes(filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
  }
`;

const Episodes = () => {
  const { loading, error, data } = useQuery(RICKS_EPISODES_QUERY);

  if (loading)
    return (
      <Box justifyContent={"center"} m={3}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    );
  if (error) return <Typography>Error :(</Typography>;
  if (!data) return <Typography>No data available...</Typography>;

  const cards = data ? (
    data.episodes.results.map((episode: any, index: any) => (
      <Card key={index} className="Card">
        <CardContent className="CardContent">
          <Typography>
            <span className="Stat">Name: </span>
            {episode.name}
          </Typography>
        </CardContent>
      </Card>
    ))
  ) : (
    <Typography>No data available...</Typography>
  );

  return (
    <Fragment>
      <Box>Total: {data.episodes.info.count}</Box>
      <Box
        display={"inline-flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        m={3}
      >
        {cards}
      </Box>
    </Fragment>
  );
};

export default Episodes;
