import React from "react";
import {Typography, Modal, Box, Grid} from "@mui/material";
import TransitionButton from "./TransitionButton";
import { useNavigate } from "react-router-dom";
let navigate = useNavigate();
//便宜的なスタイルです。
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props) => {
  const [playerName1, playerName2] = props.players;

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.gameWinner !== "draw" ? (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                The winner is {props.gameWinner === "Player1" ? playerName1 : playerName2}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Congratulations! {props.gameWinner === "Player1" ? playerName1 : playerName2} win the game!
              </Typography>
            </>
          ) : (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Draw
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                This game is a draw. Try again!
              </Typography>
            </>
          )}
          <Grid
            container
            item
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item sm={6}>
              <TransitionButton name={"Back to Home"} onClick={() => navigate("/")}/>
            </Grid>
            <Grid item sm={6}>
              <TransitionButton name={"Retry"} onClick={props.handleClose}/>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
