import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Form from "../components/Form";
import TransitionButton from "../components/TransitionButton";
import "./settings.css";

const Settings = (props) => {
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
                    value={props.playerName1}
                    onChange={props.onPlayerNameChange}
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
                    value={props.playerName2}
                    onChange={props.onPlayerNameChange}
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
                    value={props.borderSizeHeight}
                    onChange={props.onNumberChange}
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
                    value={props.borderSizeWidth}
                    onChange={props.onNumberChange}
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
                  value={props.victoryCondition}
                  onChange={props.onNumberChange}
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
