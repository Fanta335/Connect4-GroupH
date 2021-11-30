import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
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

const betweenParagraphSpace = {
  marginBottom: "0.8rem",
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
          <Grid style={{ width: "100%", textAlign: "right" }}>
            <CloseIcon onClick={props.handleClose} />
          </Grid>
          <Grid item sm={12} alignItems="center" style={{ paddingTop: "0" }}>
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

const getSteps = () => ["基本ルール", "対戦モード", "カスタマイズ", "History機能"];

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
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Grid>
            <Typography variant="h5" component="h5" style={{ textAlign: "center", padding: "20px 0" }}>
              基本ルール
            </Typography>
            <Typography style={betweenParagraphSpace}>1:ホーム画面からゲームモードを選択します</Typography>
            <Typography style={betweenParagraphSpace}>
              2:石を置きたい列をクリックし、Player1とPlayer2もしくはCPUで交互に石を置いていきます
            </Typography>
            <Typography style={betweenParagraphSpace}>
              3:先に縦・横・斜めのいずれかで4つ連続で石を並べた方が勝ちです
            </Typography>
          </Grid>
        );
      case 1:
        return (
          <Grid>
            <Typography variant="h5" component="h5" style={{ textAlign: "center", padding: "20px 0" }}>
              選べる対戦モード
            </Typography>
            <Typography>・vs Player</Typography>
            <Typography style={betweenParagraphSpace}>プレイヤー同士で対戦できます</Typography>
            <Typography>・vs CPU</Typography>
            <Typography style={betweenParagraphSpace}>
              CPUとの対戦ができます。強さはEasy/Medium/Hardから選べます
            </Typography>
          </Grid>
        );
      case 2:
        return (
          <Grid>
            <Typography variant="h5" component="h5" style={{ textAlign: "center", padding: "20px 0" }}>
              自由にカスタマイズ
            </Typography>
            <Typography style={betweenParagraphSpace}>
              Settingsボタンをクリックすると設定を変更できます。好みの設定で遊んでみましょう！
            </Typography>
            <Typography style={betweenParagraphSpace}>
              Playerの名前、ゲームボードの大きさ、勝利条件、持ち時間を変更できます
            </Typography>
            <Typography style={{ paddingBottom: "20px" }}>
              左上のスイッチでダークモードとライトモードを切り替えられます。
            </Typography>
          </Grid>
        );
      case 3:
        return (
          <Grid>
            <Typography variant="h5" component="h5" style={{ textAlign: "center", padding: "20px 0" }}>
              History機能で手番を記録！
            </Typography>
            <Typography style={betweenParagraphSpace}>historyボタンを押すと、対戦の履歴を確認できます。</Typography>
            <Typography style={{ paddingBottom: "20px" }}>
              好きな手番に戻り、その手番から試合をし直すこともできます
            </Typography>
          </Grid>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={() => {
        props.handleClose();
        handleReset();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box item sx={style}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item lg={10} sm={10} xs={8}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <div>
                <Typography variant="h5" component="h5" style={{ textAlign: "center", padding: "20px 0" }}>
                  Let&apos;s enjoy playing!
                </Typography>
                <TransitionButton
                  variant="contained"
                  color="primary"
                  name="Return to Game"
                  onClick={() => {
                    handleReset();
                    props.handleClose();
                  }}
                />
              </div>
            ) : (
              <div>
                <div>{getStepContent(activeStep)}</div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TransitionButton disabled={activeStep === 0} onClick={handleBack} name="戻る" />
                  </Grid>
                  <Grid item xs={6}>
                    <TransitionButton variant="contained" color="primary" onClick={handleNext} name="次へ" />
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export { GameStartModal, GameFinishModal, HowToPlayModal };
