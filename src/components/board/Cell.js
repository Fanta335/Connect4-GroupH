import React from "react";

import { Box } from "@mui/material";

import "./Board.css";

// import { createTheme } from "@mui/material";
import "../../animation.css";

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
    position: "relative",
    boxShadow: "4px 4px 5px 4px #444 inset",
  },
  disc: {
    width: "100%",
    paddingTop: "100%",
    borderRadius: "100%",
    position: "absolute",
    left: "0",
    top: "0",
    zIndex: "10",
    background: "transparent",
  },
};

const Cell = (props) => {
  const discStyle = styles.disc;
  if (props.value === "Player1") {
    discStyle.background = props.playerColor1;
  } else if (props.value === "Player2") {
    discStyle.background = props.playerColor2;
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
      
    >
      <Box sx={styles.white}>{props.value !== null && <Box sx={discStyle} className="drop" />}</Box>
    </Box>
  );
};

export default Cell;
