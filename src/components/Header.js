import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, Typography, useMediaQuery, Button, IconButton, MenuItem, Menu } from "@mui/material";
import { useTheme, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import useTimer from "../utils/useTimer";

const createdTheme = createTheme();
const useStyles = makeStyles({
  headerRoot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: createdTheme.spacing(2),
  },
  headerTitle: {
    [createdTheme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
});

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const timeControl = props.timeMinControl * 60 + props.timeSecControl;
  const [count1, startTimer1, stopTimer1, resetTimer1, setTimer1] = useTimer(timeControl);
  const [count2, startTimer2, stopTimer2, resetTimer2, setTimer2] = useTimer(timeControl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    navigate(pageURL);
    setAnchorEl(null);
  };
  const handleButtonClick = (pageURL) => {
    if (location.pathname !== "/game") {
      stopTimer1();
      stopTimer2();
    }
    navigate(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "Settings",
      pageURL: "/settings",
    },
  ];

  return (
    <div className={classes.headerRoot}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6">Connect 4</Typography>
          </Link>
          {isMobile ? (
            <div className={classes.headerOptions}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className={classes.menuButton}
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={props.handleHowToPlayModalOpen}>How to play?</MenuItem>
                {menuItems.map((menuItem, index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem key={index} onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          ) : (
            <div className={classes.headerOptions}>
              <Button color="inherit" onClick={props.handleHowToPlayModalOpen} style={{ fontSize: "1rem" }}>
                How to play?
              </Button>
              {menuItems.map((menuItem, index) => {
                const { menuTitle, pageURL } = menuItem;
                return (
                  <Button
                    key={index}
                    color="inherit"
                    onClick={() => handleButtonClick(pageURL)}
                    style={{ marginLeft: "0.8rem", fontSize: "1rem" }}
                  >
                    {menuTitle}
                  </Button>
                );
              })}
            </div>
          )}

          {props.darkMode ? (
            <IconButton color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
              <Brightness7Icon />
            </IconButton>
          ) : (
            <IconButton color="inherit" onClick={() => props.setDarkMode(!props.darkMode)}>
              <Brightness4Icon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
