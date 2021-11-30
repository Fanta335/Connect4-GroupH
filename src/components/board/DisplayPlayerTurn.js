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
  const playerColor1 = props.playerColor1;
  return (
    <Grid sx={{ opacity: props.playerTurn ? 1 : 0.2 }}>
      <Grid sx={playerTurnStyle}>
        {playerTurn1}
        <Box sx={{ borderRadius: "100%", background: playerColor1, height: "2em", width: "2em", ml: 2 }} />
      </Grid>
    </Grid>
  );
};

const DisplayPlayer2Turn = (props) => {
  const playerTurn2 = props.players[1];
  const playerColor2 = props.playerColor1;
  return (
    <Grid sx={{ opacity: props.playerTurn ? 0.2 : 1 }}>
      <Grid sx={playerTurnStyle}>
        {playerTurn2}
        <Box sx={{ borderRadius: "100%", background: playerColor2, height: "2em", width: "2em", ml: 2 }} />
      </Grid>
    </Grid>
  );
};

export { DisplayPlayer1Turn, DisplayPlayer2Turn };
