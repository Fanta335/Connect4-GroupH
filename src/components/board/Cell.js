import React from "react";

import { Box } from "@mui/material";

import "./Board.css";
<<<<<<< HEAD

=======
>>>>>>> develop
// import { createTheme } from "@mui/material";
import "../../animation.css";

<<<<<<< HEAD
// const theme = createTheme();

=======
>>>>>>> develop
const styles = {
  cell: {
    width: "100%",
    padding: "12.5% 0",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  white: {
    paddingTop: "75%",
    width: "75%",
    background: "white",
    borderRadius: "100%",
    position: "relative"
  },
  red: {
    width: "100%",
    paddingTop: "100%",
    background: "red",
    borderRadius: "100%",
    position: "absolute",
    left : "0",
    top: "0",
    zIndex: "10"
  },
  yellow: {
    width: "100%",
    paddingTop: "100%",
    background: "yellow",
    borderRadius: "100%",
    position: "absolute",
    left : "0",
    top: "0",
    zIndex: "10"
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
      sx={{
        ...styles.cell,
        backgroundColor: "primary.dark",
      }}
      data-x={props.x}
      data-y={props.y}
      onClick={props.onClick}
      style={{

      }}
    >
      <Box sx={styles.white}>{props.value !== null && <Box sx={color} className="drop" />}</Box>
    </Box>
  );
};

export default Cell;
