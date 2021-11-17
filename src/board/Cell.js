import React from "react";
import "./Board.css";
import Box from "@mui/material/Box";

const styles = {
  cell: {
    height: "7rem",
    width: "7rem",
    background: "#1565c0",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  white: {
    height: "5.5em",
    width: "5.5em",
    background: "white",
    borderRadius: "100%",
  },
  red: {
    height: "5.5em",
    width: "5.5em",
    background: "red",
    borderRadius: "100%",
  },
  yellow: {
    height: "5.5em",
    width: "5.5em",
    background: "yellow",
    borderRadius: "100%",
  },
};

const Cell = (props) => {
  let color = styles.white;
  if (props.value === "Player1") {
    color = styles.red;
  } else if (props.value === "Player2") {
    color = styles.yellow;
  }
  return (
    <Box sx={styles.cell} data-x={props.x} data-y={props.y} onClick={props.onClick}>
      <Box sx={color}></Box>
    </Box>
  );
};

export default Cell;
