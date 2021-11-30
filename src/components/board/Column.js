import React from "react";

import { Grid } from "@mui/material";

import Cell from "./Cell";

import "./Board.css";

const Column = (props) => (
  <Grid item sx={{ display: "flex", flexDirection: "column-reverse" }} xs={12}>
    {props.column.map((y, i) => (
      <Cell
        value={y}
        key={i}
        x={props.x}
        y={i}
        playerColor1={props.playerColor1}
        playerColor2={props.playerColor2}
        onClick={props.onClick}
      />
    ))}
  </Grid>
);

export default Column;
