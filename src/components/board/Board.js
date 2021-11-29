import React from "react";

import { Grid } from "@mui/material";

import Column from "./Column";

import "./Board.css";

const Board = (props) => (
  <Grid sx={{ display: "flex", flexDirection: "row" }}>
    {props.board.map((x, i) => (
      <Column column={x} key={i} x={i} onClick={props.onClick} />
    ))}
  </Grid>
);

export default Board;
