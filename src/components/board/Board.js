import React from "react";

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Column from "./Column";

const useStyles = makeStyles((theme) => ({
  board: {
    boxShadow: "inset 0 10px 0 rgba(255,255,255,0.2), 0 10px 10px rgba(0, 0, 0, 0.19)",
  },
}));

const Board = (props) => {
  const classes = useStyles();

  return (
    <Grid item sx={{ display: "flex", flexDirection: "row" }} xs={12} className={classes.board}>
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
};

export default Board;
