import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
// TODO: Player1とPlayer2を定数ファイルに入れる
const DisplayPlayerTurn = (props) => {
  let playerTurn = "";
  let backgroundColor = "";
  if (props.playerTurn) {
    playerTurn = props.playerName1;
    backgroundColor = "red";
  } else {
    playerTurn = props.playerName2;
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
