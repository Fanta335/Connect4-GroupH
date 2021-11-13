import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>Connect 4!</h1>
      <div>
        <div>
          <input type="radio" name="difficulty" />
          <label>vs Player</label>
        </div>
        <div>
          <input type="radio" name="difficulty" />
          <label>vs CPU</label>
        </div>
      </div>
      <Link to="/game">
        <Button variant="contained" color="primary" style={{ height: "50px" }} fullWidth>
          Start!
        </Button>
      </Link>
    </div>
  );
};
export default Home;
