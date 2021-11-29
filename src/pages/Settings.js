import React from "react";
import { Link } from "react-router-dom";

import { Typography, Grid, TextField, createTheme, Paper, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  const formItems = [
    {
      players: [
        {
          label: "Player1",
          name: "playerName1",
        },
        {
          label: "Player2",
          name: "playerName2",
        },
      ],
    },
    {
      BoardSize: [
        {
          label: "Height",
          name: "boardSizeHeight",
          inputProps: {
            max: 100,
            min: 6,
          },
        },
        {
          label: "Width",
          name: "boardSizeWidth",
          inputProps: {
            max: 100,
            min: 7,
          },
        },
      ],
    },
  ];
  const buttons = [
    {
      name: "Back",
    },
    {
      name: "Confirm",
    },
  ];

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
                {formItems[0].players.map((player, index) => {
                  return (
                    <Grid item xs={12} md={6} key={index}>
                      <TextField
                        label={player.label}
                        variant="outlined"
                        name={player.name}
                        value={props.players[index]}
                        onChange={props.onPlayerNameChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ textAlign: "right", width: "100%" }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            }
          />
          <Form
            label="Board Size"
            input={
              <Grid container alignItems="center" justifyContent="center" spacing={3} className={classes.formBlock}>
                {formItems[1].BoardSize.map((formItem, index) => {
                  return (
                    <Grid item xs={12} md={6} key={index}>
                      <TextField
                        label={formItem.label}
                        variant="outlined"
                        type="number"
                        onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
                        name={formItem.name}
                        value={props.boardSize[index]}
                        onChange={props.onNumberChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ textAlign: "right", width: "100%" }}
                        InputProps={{
                          inputProps : {
                            min : formItem.inputProps.min,
                            max : formItem.inputProps.max
                          }
                        }}
                      />
                    </Grid>
                  );
                })}
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
          {buttons.map((button,index) => {
            return(
              <Grid item xs={12} md={6} key={index}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <TransitionButton name={button.name} />
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Settings;
