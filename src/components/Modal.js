import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  const playerName1 = props.playerName1;
  const playerName2 = props.playerName2;

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
                The winner is {props.playerTurn ? playerName1 : playerName2}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Congratulations! {props.playerTurn ? playerName1 : playerName2} win the game!
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
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
