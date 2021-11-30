import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Switch,
  Grid,
} from "@mui/material";
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

// TODO: Yuki Ueno: ゲーム画面からホーム画面、設定画面に遷移する際にタイマーを停止する処理を追加する（参考：https://weblike-curtaincall.ssl-lolipop.jp/blog/?p=2056）

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  // TODO: Yuki Ueno: ゲーム画面からホーム画面、設定画面に遷移する際にタイマーを停止する処理を追加する（参考：https://weblike-curtaincall.ssl-lolipop.jp/blog/?p=2056）

  return (
    <div className={classes.headerRoot}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6">Connect 4</Typography>
          </Link>
          <Switch checked={props.darkMode} onChange={() => props.setDarkMode(!props.darkMode)} />
          <Grid>
            {/* 開発する際、対戦形式を確認しやすくするため便宜的に書き込んでいます。 */}
            <Typography variant="h6" component="h6">
              {props.gameMode === "cpu" ? "vsCPU" : "vsPlayer"}
            </Typography>
          </Grid>
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
              {menuItems.map((menuItem, index) => {
                const { menuTitle, pageURL } = menuItem;
                return (
                  <Button
                    key={index}
                    variant="contained"
                    color="success"
                    onClick={() => handleButtonClick(pageURL)}
                    style={{ marginLeft: "20px" }}
                  >
                    {menuTitle}
                  </Button>
                );
              })}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
