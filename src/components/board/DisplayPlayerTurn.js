import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";

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

const DisplayPlayerTurn = (props) => {
  let playerTurn = "";
  let backgroundColor = "";
  if (props.playerTurn == false) {
    playerTurn = props.playerName1;
    backgroundColor = "red";
  } else {
    playerTurn = props.playerName2;
    backgroundColor = "yellow";
  }
  return (
    <Grid sx={{ ml: 3 }}>
      <Grid sx={playerTurnStyle}>
        {playerTurn}
        <Box sx={{ borderRadius: "100%", background: backgroundColor, height: "2em", width: "2em", ml: 2 }}></Box>
      </Grid>
    </Grid>
  );
};

export default DisplayPlayerTurn;
