import React from "react";

import Button from "@mui/material/Button";

const TransitionButton = (props) => (
  <Button
    style={{ height: "50px" }}
    onClick={props.onClick}
    variant="contained"
    color="primary"
    fullWidth
    disabled={props.disabled}
  >
    {props.name}
  </Button>
);

export default TransitionButton;
