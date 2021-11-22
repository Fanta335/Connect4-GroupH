import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Form from "../components/Form";
import TransitionButton from "../components/TransitionButton";
import "./Home.css";

const Home = (props) => {
  const gameMode = props.gameMode;
  const cpuStrength = props.cpuStrength;

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ height: "100vh" }}>
      <Grid container item xs={6} spacing={3}>
        <Grid container item alignItems="center" justifyContent="center">
          <Typography component="div">
            <Box sx={{ fontSize: "h3.fontSize", fontWeight: "bold", m: 1 }}>Connect4!</Box>
          </Typography>
        </Grid>

        <Grid container item alignItems="center" justifyContent="center">
          <Grid item xs={6}>
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
  );
};
export default Home;
