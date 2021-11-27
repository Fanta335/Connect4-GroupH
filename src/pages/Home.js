import React from "react";
import { Link } from "react-router-dom";
import {Typography,Grid, Radio, RadioGroup, FormControlLabel, createTheme } from "@mui/material";
import Form from "../components/Form";
import TransitionButton from "../components/TransitionButton";
import "./Home.css";
import { makeStyles } from "@mui/styles";
const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingTop: "24px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inner:{
    height: "calc(100vh  - 88px)"
  },
  body: {
    backgroundColor: "white",
    flexBasis: "33.3333333% !important",
    padding: theme.spacing(3)
  }
});
const Home = (props) => {
  const gameMode = props.gameMode;
  const cpuStrength = props.cpuStrength;
  const classes = useStyles();
  return (
    <div
      className={classes.root}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        className={classes.inner}
        >
        <Grid
          container
          item
          sm={6}
          spacing={3}
          justifyContent="center"
          className={classes.body}>
          <Typography variant="h3">
            Connect4!
          </Typography>
          <Grid container item alignItems="center" justifyContent="center">
            <Grid item sm={6}>
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
              <Grid item xs={6}>
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

          <Grid container item alignItems="center" justifyContent="center" spacing={3}>
            <Grid item xs={8}>
              <Link to="/game" style={{ textDecoration: "none" }}>
                <TransitionButton name="Start!" />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Home;
