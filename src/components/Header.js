import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Home
        </Button>
      </Link>
      <Link to="/settings">
        <Button variant="contained" color="secondary">
          Settings
        </Button>
      </Link>
    </header>
  );
};

export default Header;
