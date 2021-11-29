import Button from "@mui/material/Button";

const InitButton = (props) => (
  <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
    Restart Game
  </Button>
);

export default InitButton;
