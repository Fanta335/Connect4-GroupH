import React from "react";
import "./Board.css";
import Column from "./../board/Column.js";
import Grid from "@mui/material/Grid";

const Board = (props) => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "row" }}>
      {props.board.map((x, i) => (
        <Column column={x} key={i} x={i} onClick={props.onClick} />
      ))}
    </Grid>
  );
};

export default Board;
