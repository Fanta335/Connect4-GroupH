import React, { useState } from "react";
import { AppBar, Toolbar, Typography, useMediaQuery, Button, IconButton, MenuItem, Menu, Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
const theme = createTheme();
const useStyles = makeStyles({
  headerRoot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  headerTitle: {
    [theme.breakpoints.down("sm")]: {
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
  let navigate = useNavigate();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    navigate(pageURL);
    setAnchorEl(null);
  };
  const handleButtonClick = (pageURL) => {
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
          <Link to="/" style={{textDecoration: 'none', color: "white"}}>
            <Typography variant="h6">Connect 4</Typography>
          </Link>
          <Switch checked={props.darkMode} onChange={() => props.setDarkMode(!props.darkMode)} />
          <Grid>
            {/* 開発する際、対戦形式を確認しやすくするため便宜的に書き込んでいます。 */}
            <Typography variant="h5" component="h5">
              {props.gameMode == "cpu" ? "vsCPU" : "vsPlayer"}
            </Typography>
          </Grid>
          <>
            {isMobile ? (
              <>
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
              </>
            ) : (
              <div className={classes.headerOptions}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {props.setOpenHistory(!props.openHistory)}}
                >
                  {props.openHistory ? "Close" : "History"}
                </Button>
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
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
