import React from "react";

import { Grid, Box } from "@mui/material";

const playerTurnStyle = {
  border: 1,
  p: 1,
  borderRadius: 2,
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 80%)",
  color: "white",
};

const DisplayPlayer1Turn = (props) => {
  const playerTurn1 = props.players[0];
  const backgroundColor1 = "red";
  return (
    <Grid sx={{ opacity: props.playerTurn ? 1 : 0.2 }}>
      <Grid sx={playerTurnStyle}>
        {playerTurn1}
        <Box sx={{ borderRadius: "100%", background: backgroundColor1, height: "2em", width: "2em", ml: 2 }} />
      </Grid>
    </Grid>
  );
};

const DisplayPlayer2Turn = (props) => {
  const playerTurn2 = props.players[1];
  const backgroundColor2 = "yellow";
  return (
    <Grid sx={{ opacity: props.playerTurn ? 0.2 : 1 }}>
      <Grid sx={playerTurnStyle}>
        {playerTurn2}
        <Box sx={{ borderRadius: "100%", background: backgroundColor2, height: "2em", width: "2em", ml: 2 }} />
      </Grid>
    </Grid>
  );
};

export { DisplayPlayer1Turn, DisplayPlayer2Turn };
