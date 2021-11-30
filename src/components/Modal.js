import React from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import { Typography, Modal, Box, Grid } from "@mui/material";

import TransitionButton from "./TransitionButton";

// 便宜的なスタイルです。
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  opacity: 0.87,
  p: 4,
};

const GameStartModal = (props) => (
  <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box item sx={style}>
      <Grid container spacing={2}>
        <Grid item sm={12} alignItems="center">
          <Typography id="modal-modal-title" variant="h4" align="center" color="primary">
            Are you ready?
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <TransitionButton
            name="Start"
            onClick={() => {
              props.handleStart();
              props.handleClose();
            }}
          />
        </Grid>
      </Grid>
    </Box>
  </Modal>
);

const GameFinishModal = (props) => {
  const [playerName1, playerName2] = props.players;
  const gameWinner = props.gameWinner;
  let statement;
  if (gameWinner === "Player1") {
    statement = `${playerName1} Wins!!`;
  } else if (gameWinner === "Player2") {
    statement = `${playerName2} Wins!!`;
  } else if (gameWinner === "draw") {
    statement = "It's a tie!!";
  }
  const navigate = useNavigate();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box item sx={style}>
        <Grid container spacing={2}>
          <Grid style={{width: "100%", textAlign: "right"}}>
            <CloseIcon onClick={props.handleClose}/>
          </Grid>
          <Grid item sm={12} alignItems="center" style={{paddingTop: "0"}}>
            <Typography id="modal-modal-title" variant="h4" align="center" color="primary">
              {statement}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <TransitionButton name="Back to Home" onClick={() => navigate("/")} />
          </Grid>
          <Grid item sm={6}>
            <TransitionButton
              name="Retry"
              onClick={() => {
                props.handleStart();
                props.handleClose();
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export { GameStartModal, GameFinishModal };
