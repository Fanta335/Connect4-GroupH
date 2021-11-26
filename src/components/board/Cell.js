import React from "react";
import "./Board.css";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material";
import "../../animation.css";
const theme = createTheme();
const styles = {
  cell: {
    height: "4.5rem",
    width: "4.5rem",
    background: "#1565c0",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  white: {
    height: "3.5em",
    width: "3.5em",
    background: "white",
    borderRadius: "100%",
  },
  red: {
    height: "3.5em",
    width: "3.5em",
    background: "red",
    borderRadius: "100%",
  },
  yellow: {
    height: "3.5em",
    width: "3.5em",
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
    <Box
      sx={styles.cell}
      data-x={props.x}
      data-y={props.y}
      onClick={props.onClick}
      style={{
        padding: theme.spacing(1),
      }}
    >
      <Box sx={styles.white}>
        {props.value !== null && <Box sx={color} className="drop"></Box>}
      </Box>
    </Box>
  );
};

export default Cell;
