import React, { useState } from "react";
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
  const [borderSizeHeight, setBorderSizeHeight] = useState(6);
  const [borderSizeWidth, setBorderSizeWidth] = useState(7);
  const [cpuStrength, setCpuStrength] = useState("easy");
  const [victoryCondition, setVictoryCondition] = useState(4);

  const handleInputChange = (event) => {
    const name = event.target.name;
    if (name === "cpuStrength") {
      setCpuStrength(event.target.value);
    }
  };

  const handleInputNumberChange = (event) => {
    const min = parseInt(event.target.min);
    const max = parseInt(event.target.max);
    let tempValue = "";
    if (event.target.value !== "") {
      tempValue = parseInt(event.target.value);
    }
    if (tempValue > max || tempValue < min) {
      return;
    }
    const name = event.target.name;
    if (name === "borderSizeHeight") {
      setBorderSizeHeight(tempValue);
    } else if (name === "borderSizeWidth") {
      setBorderSizeWidth(tempValue);
    } else if (name === "victoryCondition") {
      setVictoryCondition(tempValue);
    }
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
                    label="Hight"
                    variant="outlined"
                    type="number"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    name="borderSizeHeight"
                    value={borderSizeHeight}
                    onChange={handleInputNumberChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", minWidth: "200px" }}
                    InputProps={{
                      inputProps: {
                        max: 100,
                        min: 6,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Width"
                    variant="outlined"
                    type="number"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    name="borderSizeWidth"
                    value={borderSizeWidth}
                    onChange={handleInputNumberChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", minWidth: "200px" }}
                    InputProps={{
                      inputProps: {
                        max: 100,
                        min: 7,
                      },
                    }}
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
                value={cpuStrength}
                onChange={handleInputChange}
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
                  variant="outlined"
                  type="number"
                  onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                  name="victoryCondition"
                  value={victoryCondition}
                  onChange={handleInputNumberChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ textAlign: "right", minWidth: "200px" }}
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 4,
                    },
                  }}
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
