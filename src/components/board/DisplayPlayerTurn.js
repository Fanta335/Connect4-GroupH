import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const playerTurnStyle = {
  border: 1,
  p: 2,
  borderRadius: 3,
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
    playerTurn = "Player1";
    backgroundColor = "red";
  } else if (props.playerTurn == true) {
    playerTurn = "Player2";
    backgroundColor = "yellow";
  }
  return (
    <Grid sx={{ ml: 3 }}>
      <Typography variant="h5" component="h5" sx={{ textAlign: "center" }}>
        Player Turn
      </Typography>
      <Grid sx={playerTurnStyle}>
        {playerTurn}
        <Box sx={{ borderRadius: "100%", background: backgroundColor, height: "2em", width: "2em", ml: 2 }}></Box>
      </Grid>
    </Grid>
  );
};

export default DisplayPlayerTurn;
