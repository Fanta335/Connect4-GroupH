import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Typography, Grid, TextField, createTheme, Paper, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";


import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Form from "../components/Form";
import TransitionButton from "../components/TransitionButton";
import "./settings.css";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)",
    margin: "0 auto",
    minHeight: "calc(100vh - 64px)",
    padding: "40px 0"
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
  formBlock: {
    marginBottom: "20px",
  },
});

const Settings = (props) => {
  const victoryConditionMax = props.boardSize[1] <= props.boardSize[0] ? props.boardSize[1] : props.boardSize[0];

  const classes = useStyles();

  const buttons = [
    {
      name: "Back",
    },
    {
      name: "Confirm",
    },
  ];

  const basicSchema = Yup.object().shape();
  const { control, handleSubmit } = useForm({
    mode: "onBlur",
    defaultValues: {
      playerName1: "Player1",
      playerName2: "Player2",
      boardSizeHeight: 6,
      boardSizeWidth: 7,
      victoryCondition: 4,
      timeMinControl: 20,
      timeSecControl: 0
    },
    resolver: yupResolver(basicSchema)
  });

  return (
    <Grid container alignItems="center" justifyContent="center" className={classes.root}>
      <Paper className={classes.inner}>
        <Typography variant="h4" style={{ textAlign: "center", margin: "30px 0" }}>
          Settings
        </Typography>
        <Grid container item alignItems="center" justifyContent="center">
          <Form
            label="Player Name"
            input={
              <Grid container alignItems="center" justifyContent="center" spacing={3} className={classes.formBlock}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Player1"
                    variant="outlined"
                    name="playerName1"
                    value={props.players[0]}
                    onChange={props.onPlayerNameChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Player2"
                    variant="outlined"
                    name="playerName2"
                    value={props.players[1]}
                    onChange={props.onPlayerNameChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "100%" }}
                  />
                </Grid>
              </Grid>
            }
          />
          <Form
            label="Board Size"
            input={
              <Grid container alignItems="center" justifyContent="center" spacing={3} className={classes.formBlock}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Height"
                    variant="outlined"
                    type="number"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    name="boardSizeHeight"
                    value={props.boardSize[0]}
                    onChange={props.onNumberChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "100%" }}
                    InputProps={{
                      inputProps: {
                        max: 100,
                        min: 7,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Width"
                    variant="outlined"
                    type="number"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    name="boardSizeWidth"
                    value={props.boardSize[1]}
                    onChange={props.onNumberChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "100%" }}
                    InputProps={{
                      inputProps: {
                        max: 100,
                        min: 6,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <div className={classes.formBlock}>
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            xs={8}
            sm={3}
          >
            <Form
              label="Victory Condition"
              input={
                <Grid
                  item
                >
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
                    InputProps={{
                      inputProps: {
                        max: victoryConditionMax,
                        min: 4,
                      },
                    }}
                    style={{width: "100%"}}
                  />
                </Grid>
              }
            />
          </Grid>
        </div>
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
        >
          <Form
            label="Time Control"
            input={
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={3}
                className={classes.formBlock}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Minute"
                    variant="outlined"
                    type="number"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    name="timeMinControl"
                    value={props.timeMinControl}
                    onChange={props.onNumberChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "100%" }}
                    InputProps={{
                      inputProps: {
                        max: 60,
                        min: 1,
                      },
                      endAdornment: <InputAdornment position="end">min</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Second"
                    variant="outlined"
                    type="number"
                    onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                    name="timeSecControl"
                    value={props.timeSecControl}
                    onChange={props.onNumberChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ textAlign: "right", width: "100%" }}
                    InputProps={{
                      inputProps: {
                        max: 60,
                        min: 0,
                      },
                      endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <Grid
          container
          item
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          {buttons.map((button,index) => (
            <Grid item xs={12} md={6} key={index}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <TransitionButton name={button.name} />
              </Link>
            </Grid>
            ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Settings;
