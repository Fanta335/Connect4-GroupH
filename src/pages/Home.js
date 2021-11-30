import { React, useEffect } from "react";
import { Link } from "react-router-dom";

import { Typography, Grid, Paper, Radio, RadioGroup, FormControlLabel, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Form from "../components/Form";
import TransitionButton from "../components/TransitionButton";

import "./Home.css";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: "0 auto",
    minHeight: "calc(100vh - 64px)",
    padding: "40px 0",
  },
  inner: {
    backgroundColor: "white",
    padding: theme.spacing(3),
    width: "50%",
  },
  body: {
    backgroundColor: "white",
    flexBasis: "33.3333333% !important",
    padding: theme.spacing(3),
  },
});
const Home = (props) => {
  const gameMode = props.gameMode;
  const cpuStrength = props.cpuStrength;
  const classes = useStyles();
  const pageName = "Home";
  useEffect(() => {
    document.title = `Connect4 - ${pageName}`;
  });

  return (
    <Grid container alignItems="center" justifyContent="center" flexDirection="column" className={classes.root}>
      <Paper className={classes.inner}>
        <Typography variant="h3" style={{ textAlign: "center", paddingBottom: "24px" }}>
          Connect4!
        </Typography>
        <Grid container item alignItems="center" justifyContent="center">
          <Grid item xs={7} md={8} style={{ paddingBottom: "24px" }}>
            <Form
              label="Game Mode"
              input={
                <RadioGroup row aria-label="gameMode" name="gameMode" value={gameMode} onChange={props.onChange}>
                  <FormControlLabel value="player" control={<Radio />} label="vs Player" />
                  <FormControlLabel value="cpu" control={<Radio />} label="vs CPU" />
                </RadioGroup>
              }
            />
          </Grid>
        </Grid>

        {gameMode === "cpu" && (
          <Grid container item alignItems="center" justifyContent="center">
            <Grid
              item
              xs={7}
              md={8}
              style={{
                paddingBottom: "24px",
              }}
              justifyContent="center"
            >
              <Form
                label="CPU Strength"
                input={
                  <RadioGroup
                    row
                    aria-label="cpuStrength"
                    name="cpuStrength"
                    value={cpuStrength}
                    onChange={props.onChange}
                  >
                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                  </RadioGroup>
                }
              />
            </Grid>
          </Grid>
        )}

        <Grid container item alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <Link to="/game" style={{ textDecoration: "none" }}>
              <TransitionButton name="Start!" />
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export default Home;
