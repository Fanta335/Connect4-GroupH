import React from "react";
import "./GameDisplayPage.css";
import Modal from "../components/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Board from "./../components/board/Board.js";
import DisplayPlayerTurn from "./../components/board/DisplayPlayerTurn.js";

const InitButton = (props) => {
  return (
    <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
      New Game
    </Button>
  );
};

const GameDisplayPage = (props) => {
  let status;
  if (props.gameWinner) {
    status = "Winner: " + props.gameWinner;
  } else {
    status = "Next player: " + (props.isNextPlayerRed ? "Player2" : "Player1");
  }
  return (
    <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" component="h1">
        Connect 4!
      </Typography>
      <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-end", mb: 2 }}>
        <InitButton onClick={props.initGame} />
        <DisplayPlayerTurn playerTurn={props.isNextPlayerRed} />
      </Grid>
      <Board board={props.current} onClick={props.handleClick} />

      {/* それぞれの手番の情報を表示する */}
      <Grid className="game-info">
        <Grid>{status}</Grid>
        <List>{props.moves}</List>
      </Grid>
      {/* 便宜的にゲームの勝者をお知らせするモーダルを貼り付けています。 */}
      <Modal
        handleOpen={props.handleOpen}
        handleClose={props.handleClose}
        open={props.open}
        gameWinner={props.gameWinner}
      />
    </Grid>
  );
};

export default GameDisplayPage;
