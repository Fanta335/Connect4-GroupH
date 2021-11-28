import React from "react";
import "./Board.css";
import Cell from "./../board/Cell.js";
import { Grid } from "@mui/material";

const Column = (props) => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column-reverse" }}>
      {props.column.map((y, i) => (
        <Cell value={y} key={i} x={props.x} y={i} onClick={props.onClick} />
      ))}
    </Grid>
  );
};

export default Column;
