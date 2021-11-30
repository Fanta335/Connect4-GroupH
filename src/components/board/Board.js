import React from "react";

import { Grid } from "@mui/material";

import Column from "./Column";

const Board = (props) => (
  <Grid item sx={{ display: "flex", flexDirection: "row" }} xs={12}>
    {props.board.map((x, i) => (
      <Column
        column={x}
        key={i}
        x={i}
        playerColor1={props.playerColor1}
        playerColor2={props.playerColor2}
        onClick={props.onClick}
      />
    ))}
  </Grid>
);

export default Board;
