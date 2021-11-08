import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "./settings.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Form = (props) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormLabel component="legend">{props.label}</FormLabel>
      </Grid>
      <Grid item xs={12}>
        {props.input}
      </Grid>
    </Grid>
  );
};

const TransitionButton = (props) => {
  return (
    <Button style={{ height: "50px" }} onClick={props.onClick} variant="contained" color="primary" fullWidth>
      {props.name}
    </Button>
  );
};

const Settings = () => {
  const [state, setState] = useState({
    borderSizeHeight: 6,
    borderSizeWidth: 7,
    cpuStrength: "easy",
    victoryCondition: 4,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ height: "100vh" }}>
      <Grid container item xs={6} spacing={3}>
        <Grid container item alignItems="center" justifyContent="center">
          <Typography component="div">
            <Box sx={{ fontSize: "h4.fontSize", fontWeight: "bold", m: 1 }}>Settings</Box>
          </Typography>
        </Grid>

        <Grid container item alignItems="center" justifyContent="center">
          <Form
            label="Border Size"
            input={
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    name="borderSizeHeight"
                    value={state.borderSizeHeight}
                    id="outlined-basic"
                    label="Height"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    name="borderSizeWidth"
                    value={state.borderSizeWidth}
                    id="outlined-basic"
                    label="Width"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            }
          />
        </Grid>

        <Grid container item alignItems="center" justifyContent="center">
          <Form
            label="CPU Strength"
            input={
              <RadioGroup
                row
                aria-label="cpuStrength"
                name="cpuStrength"
                value={state.cpuStrength}
                onChange={handleChange}
              >
                <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="hard" control={<Radio />} label="Hard" />
              </RadioGroup>
            }
          />
        </Grid>

        <Grid container item alignItems="center" justifyContent="center">
          <Form
            label="Victory Condition"
            input={
              <>
                <TextField
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  name="victoryCondition"
                  value={state.victoryCondition}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleChange}
                />
              </>
            }
          />
        </Grid>

        <Grid container item alignItems="center" justifyContent="center" spacing={3}>
          <Grid item xs={6}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <TransitionButton name="Back" />
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <TransitionButton name="Confirm" />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Settings;
