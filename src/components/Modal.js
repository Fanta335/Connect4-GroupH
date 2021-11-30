import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import { Typography, Modal, Box, Grid, Stepper, Step, StepLabel } from "@mui/material";

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

const getSteps = () => (
  ['ルール1','ルール2','ルール3','ルール4']
);

const HowToPlayModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  }

  const getStepContent = (stepIndex) => {
    switch(stepIndex){
      case 0:
        return (<Typography>コンテンツ1</Typography>);
      case 1:
        return (<Typography>コンテンツ2</Typography>);
      case 2:
        return (<Typography>コンテンツ3</Typography>);
      case 3:
        return (<Typography>コンテンツ4</Typography>);
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box item sx={style}>
        <Grid container>
          <Grid sm={2} />
          <Grid lg={8} sm={8} spacing={10}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <div>
                <Typography >全ステップの表示を完了</Typography>
                <TransitionButton variant="contained" color="primary" name="Return to Game" onClick={() => {
                  handleReset();
                  props.handleClose();
                }}/>
              </div>
            ) : (
              <div>
                <Typography >{getStepContent(activeStep)}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TransitionButton
                        // disabled={activeStep === 0}
                        onClick={handleBack}
                        name="戻る"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TransitionButton variant="contained" color="primary" onClick={handleNext}
                    name='次へ' />
                  </Grid>
                </Grid>
            </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export { GameStartModal, GameFinishModal, HowToPlayModal };
