import React, { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Form from "../components/Form";
import TransitionButton from "../components/TransitionButton";
import "./settings.css";

const Settings = () => {
  const [borderSizeHeight, setBorderSizeHeight] = useState(6);
  const [borderSizeWidth, setBorderSizeWidth] = useState(7);
  const [victoryCondition, setVictoryCondition] = useState(4);
  const [playerName1, setPlayerName1] = useState("Player1");
  const [playerName2, setPlayerName2] = useState("Player2");

  const handleInputChange = (event) => {
    const name = event.target.name;
    if (name === "playerName1") {
      setPlayerName1(event.target.value);
    } else if (name === "playerName2") {
      setPlayerName2(event.target.value);
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
            label="Player Name"
            input={
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <TextField
                    label="Player1"
                    variant="outlined"
                    name="playerName1"
                    value={playerName1}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "90%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Player2"
                    variant="outlined"
                    name="playerName2"
                    value={playerName2}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "90%" }}
                  />
                </Grid>
              </Grid>
            }
          />
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
                    style={{ textAlign: "right", width: "90%" }}
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
                    style={{ textAlign: "right", width: "90%" }}
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
                  style={{ textAlign: "right", width: "45%" }}
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
