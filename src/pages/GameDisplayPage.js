/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./GameDisplayPage.css";

import { Button, Grid, List, Card, Paper, Typography, createTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Board from "../components/board/Board";
import DisplayPlayerTurn from "../components/board/DisplayPlayerTurn";
import Modal from "../components/Modal";

import calculateWinner from "../utils/calculateWinner";
import canPutStone from "../utils/canPutStone";
import copyBoard from "../utils/copyBoard";
import copyHistory from "../utils/copyHistroy";
import Cpu from "../utils/cpu";
import createNewBoard from "../utils/createNewBoard";
import displayTimer from "../utils/displayTimer";
import getLowestEmptyYIndex from "../utils/getLowestEmptyYIndex";
import useTimer from "../utils/useTimer";

// import setSnackbarOpen from "../components/Snackbar";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  history: {
    marginLeft: "40px",
    padding: theme.spacing(3),
  },
  historyCard: {
    textAlign: "center",
    margin: theme.spacing(2),
  },
  infoCard: {
    padding: theme.spacing(2),
  },
});

const InitButton = (props) => (
  <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
    Start New Game
  </Button>
);

const GameDisplayPage = (props) => {
  const initBoard = createNewBoard(props.boardSize[0], props.boardSize[1], props.gameMode);

  const [isPlayer1Next, setIsPlayer1Next] = useState(true);
  const timeControl = props.timeMinControl * 60 + props.timeSecControl;
  const [count1, startTimer1, stopTimer1, resetTimer1, setTimer1] = useTimer(timeControl);
  const [count2, startTimer2, stopTimer2, resetTimer2, setTimer2] = useTimer(timeControl);

  const [gameWinner, setGameWinner] = useState("");
  const [cpuTurn, setCpuTurn] = useState(true);
  const [history, setHistory] = useState([
    {
      board: initBoard,
      count1: timeControl,
      count2: timeControl,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();

  const [canStartGame, setCanStartGame] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [openHistory, setOpenHistory] = useState(false);

  const controlTimer = (player1IsNext) => {
    if (player1IsNext) {
      startTimer1();
      stopTimer2();
    } else {
      stopTimer1();
      startTimer2();
    }
  };

  /**
   * ゲーム状態の初期化
   */
  const initGame = () => {
    setHistory([
      {
        board: initBoard,
        count1: timeControl,
        count2: timeControl,
      },
    ]);
    setGameWinner("");
    setIsPlayer1Next(true);
    setStepNumber(0);
    setCanStartGame(true);
    stopTimer1();
    stopTimer2();
    resetTimer1();
    resetTimer2();
    startTimer1();
  };

  // historyを任意の手番に遡る際にhistoryを更新する
  const updateHistory = (originalHistory, step) => {
    const updatedHistory = [];
    for (let i = 0; i <= step; i++) {
      const board = originalHistory[i].board;
      const copiedBoard = copyBoard(board);
      const copiedCount1 = originalHistory[i].count1;
      const copiedCount2 = originalHistory[i].count2;

      updatedHistory.push({
        board: copiedBoard,
        count1: copiedCount1,
        count2: copiedCount2,
      });
    }
    return updatedHistory;
  };

  /**
   * 指定の座標に石を置く
   * @param {*} board - 盤面を表す二次元配列
   * @param {*} x - 石を置く座標x
   * @param {*} y - 石を置く座標y
   */
  const putStone = (board, x, y) => {
    if (isPlayer1Next) {
      board[x][y] = "Player1";
    } else {
      board[x][y] = "Player2";
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsPlayer1Next(step % 2 === 0);
    setHistory(updateHistory(history, step));
    setGameWinner("");
    setTimer1(history[step].count1);
    setTimer2(history[step].count2);
    // player1IsNextの情報が即時反映されないため、一時的な変数を作成
    // 関数内だとuseEffectが使えなかったため、この方法で対処した
    const tempIsPlayer1Next = step % 2 === 0;
    controlTimer(tempIsPlayer1Next);
  };

  const moves = history.map((_, index) => {
    const desc = index ? `Go to move #${index}` : "Go to game start";
    return (
      <Card key={index} className={classes.historyCard}>
        <Button
          onClick={() => jumpTo(index)}
          style={{
            width: "100%",
          }}
        >
          {desc}
        </Button>
      </Card>
    );
  });

  /**
   * cpuが打つx座標を返す
   * @param {*} board
   * @param {*} victoryCondition
   * @param {*} cpuStrength
   * @return {*} cpuが打つ石のx座標
   */
  const getCpuX = (board, victoryCondition, cpuStrength) => {
    const cpu = new Cpu(board, victoryCondition, "CPU", "Player1");
    const cpuX = cpu.cpuThink(cpuStrength);
    return cpuX;
  };

  const handleClick = (event) => {
    if (isPlayer1Next === true) {
      if (gameWinner !== "") return;

      const renewedHistory = copyHistory(history);
      const currentBoard = renewedHistory[stepNumber].board;
      const nextBoard = copyBoard(currentBoard);
      const copiedCount1 = count1;
      const copiedCount2 = count2;
      const dataset = event.currentTarget.dataset;
      const x = parseInt(dataset.x, 10);

      if (canPutStone(nextBoard, x)) {
        const y = getLowestEmptyYIndex(nextBoard, x);
        putStone(nextBoard, x, y);
        setHistory(
          renewedHistory.concat([
            {
              board: nextBoard,
              count1: copiedCount1,
              count2: copiedCount2,
            },
          ])
        );
        setStepNumber(stepNumber + 1);

        let winner = calculateWinner(nextBoard, props.victoryCondition, x, y);
        if (count1 <= 0 && count2 > 0) {
          winner = "Player2";
        } else if (count2 <= 0 && count1 > 0) {
          winner = "Player1";
        }
        if (winner != null) {
          setGameWinner(winner);
          handleModalOpen();
          stopTimer1();
          stopTimer2();
        } else if (winner == null) {
          // player1IsNextの情報が即時反映されないため、一時的な変数を作成
          // 関数内・条件式内だとuseEffectが使えなかったため、この方法で対処した
          const tempPlayer1IsNext = !isPlayer1Next;
          controlTimer(tempPlayer1IsNext);
          setIsPlayer1Next(!isPlayer1Next);
          if (props.gameMode === "cpu" && isPlayer1Next === true) {
            setCpuTurn(!cpuTurn);
          }
        }
      }
    }
  };

  // cpuTurnをトリガーにcpuが石を打つ
  useEffect(() => {
    const renewedHistory = copyHistory(history);
    const currentBoard = renewedHistory[stepNumber].board;
    const nextBoard = copyBoard(currentBoard);
    const copiedCount1 = count1;
    const copiedCount2 = count2;

    if (props.gameMode === "cpu" && stepNumber !== 0) {
      setTimeout(() => {
        const cpuX = getCpuX(nextBoard, props.victoryCondition, props.cpuStrength);
        const cpuY = getLowestEmptyYIndex(nextBoard, cpuX);
        nextBoard[cpuX][cpuY] = "Player2";
        setHistory(
          renewedHistory.concat([
            {
              board: nextBoard,
              count1: copiedCount1,
              count2: copiedCount2,
            },
          ])
        );
        setStepNumber(stepNumber + 1);
        const winner = calculateWinner(nextBoard, props.victoryCondition, cpuX, cpuY);
        if (winner != null) {
          setGameWinner(winner);
          handleModalOpen();
          stopTimer1();
        } else if (winner == null) {
          const tempPlayer1IsNext = !isPlayer1Next;
          if (tempPlayer1IsNext) {
            startTimer1();
            stopTimer2();
          } else {
            stopTimer1();
            startTimer2();
          }
          setIsPlayer1Next(!isPlayer1Next);
        }
      }, 3000);
    }
  }, [cpuTurn]);

  const currentBoard = history[stepNumber].board;

  return (
    <Grid
      sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
      className={classes.root}
    >
      <Grid
        sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-end", mb: 2, mt: 2 }}
      >
        <Card className={classes.infoCard}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid flexDirection="column">
              <Typography variant="h5" component="h5" sx={{ textAlign: "center" }}>
                Reset
              </Typography>
              <InitButton onClick={initGame} item />
            </Grid>
            <Grid flexDirection="column">
              <Typography variant="h5" component="h5" sx={{ textAlign: "right" }}>
                Next Player
              </Typography>
              <DisplayPlayerTurn playerTurn={isPlayer1Next} players={props.players} gameMode={props.gameMode} item />
              <Grid>
                {displayTimer(count1)}/{displayTimer(count2)}
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setOpenHistory(!openHistory);
                }}
              >
                {props.openHistory ? "Close" : "History"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid container justifyContent="center" style={{ marginBottom: "200px" }}>
        <Grid item>
          <Board board={currentBoard} onClick={canStartGame ? handleClick : null} />
        </Grid>
        <Grid item>
          {/* それぞれの手番の情報を表示する */}
          {openHistory && (
            <Grid justifyContent="center" alignItems="center" style={{ width: "100%" }}>
              <Paper className={classes.history}>
                <Typography variant="h4">History</Typography>
                <List>{moves}</List>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* 便宜的にゲームの勝者をお知らせするモーダルを貼り付けています。 */}
      <Modal
        handleClose={handleModalClose}
        open={modalOpen}
        gameWinner={gameWinner}
        playerTurn={isPlayer1Next}
        players={props.players}
      />
    </Grid>
  );
};

export default GameDisplayPage;
