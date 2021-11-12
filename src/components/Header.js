import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <Button variant="contained" color="primary" style={{ height: "50px" }}>
          Home
        </Button>
      </Link>
      <Link to="/settings">
        <Button variant="contained" color="primary" style={{ height: "50px" }}>
          Settings
        </Button>
      </Link>
    </header>
  );
};

export default Header;
