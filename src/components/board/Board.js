import React from "react";
import Column from "./Column";
import { Grid } from "@mui/material";

const Board = (props) => {
  return (
    <Grid
      item
      sx={{display: "flex", flexDirection: "row"}}
      xs={12}
    >
      {props.board.map((x, i) => (
        <Column column={x} key={i} x={i} onClick={props.onClick} />
      ))}
    </Grid>
  );
};

export default Board;
