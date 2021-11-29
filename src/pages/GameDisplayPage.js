/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./GameDisplayPage.css";
import { Button, Grid, List, Card, Paper, Typography, createTheme } from "@mui/material";

import Modal from "../components/Modal";
// import Typography from "@mui/material/Typography";
import Board from "./../components/board/Board.js";
import DisplayPlayerTurn from "./../components/board/DisplayPlayerTurn.js";
import createNewBoard from "../utils/createNewBoard";
import canPutStone from "../utils/canPutStone";
import getLowestEmptyYIndex from "../utils/getLowestEmptyYIndex";
import calculateWinner from "../utils/calculateWinner";
import copyHistory from "../utils/copyHistroy";
import copyBoard from "../utils/copyBoard";
import { makeStyles } from "@mui/styles";
import displayTimer from "../utils/displayTimer";
import useTimer from "../utils/useTimer";
import Cpu from "../utils/cpu";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  history: {
    margin: "40px",
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

const InitButton = (props) => {
  return (
    <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
      Start New Game
    </Button>
  );
};

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

  // ゲームが終了した時に起動する↓
  const [canStartGame, setCanStartGame] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // cpuTurnをトリガーにcpuが石を打つ
  useEffect(() => {
    const renewedHistory = copyHistory(history);
    const currentBoard = renewedHistory[stepNumber].board;
    const nextBoard = copyBoard(currentBoard);
    const copiedCount1 = count1;
    const copiedCount2 = count2;

    if (props.gameMode == "cpu") {
      setTimeout(function () {
        const cpuX = getCpuX(nextBoard, props.victoryCondition, props.cpuStrength);
        const cpuY = getLowestEmptyYIndex(nextBoard, cpuX);
        nextBoard[cpuX][cpuY] = "Player2";
        updateRenewedHistory(renewedHistory, nextBoard, copiedCount1, copiedCount2);
        setStepNumber(stepNumber + 1);
        let winner = calculateWinner(nextBoard, props.victoryCondition, cpuX, cpuY);
        if (winner != null) {
          setGameWinner(winner);
          console.log(gameWinner);
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
      }, 2000);
    }
  }, [cpuTurn]);

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
  const updateHistory = (history, step) => {
    let updatedHistory = [];
    for (let i = 0; i <= step; i++) {
      const board = history[i].board;
      const copiedBoard = copyBoard(board);
      const copiedCount1 = history[i].count1;
      const copiedCount2 = history[i].count2;

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
    const tempPlayer1IsNext = step % 2 === 0;
    controlTimer(tempPlayer1IsNext);
  };

  const moves = history.map((_, index) => {
    const desc = index ? "Go to move #" + index : "Go to game start";
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

  const currentBoard = history[stepNumber].board;

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

  /**
   * historyの更新
   * @param {*} history - 最新のhistoryのコピー
   * @param {*} board - 新しいボード情報
   * @param {*} count1 - プレイヤー1の持ち時間
   * @param {*} count2 - プレイヤー2の持ち時間
   */
  const updateRenewedHistory = (history, board, count1, count2) => {
    setHistory(
      history.concat([
        {
          board: board,
          count1: count1,
          count2: count2,
        },
      ])
    );
  };

  const handleClick = (event) => {
    if (gameWinner !== "") return;

    const renewedHistory = copyHistory(history);
    const currentBoard = renewedHistory[stepNumber].board;
    const nextBoard = copyBoard(currentBoard);
    const copiedCount1 = count1;
    const copiedCount2 = count2;
    const dataset = event.currentTarget.dataset;
    const x = parseInt(dataset.x);

    if (canPutStone(nextBoard, x)) {
      const y = getLowestEmptyYIndex(nextBoard, x);
      putStone(nextBoard, x, y);
      updateRenewedHistory(renewedHistory, nextBoard, copiedCount1, copiedCount2);
      setStepNumber(stepNumber + 1);

      let winner = calculateWinner(nextBoard, props.victoryCondition, x, y);
      if (count1 <= 0 && count2 > 0) {
        winner = "Player2";
      } else if (count2 <= 0 && count1 > 0) {
        winner = "Player1";
      }
      if (winner != null) {
        setGameWinner(winner);
        console.log(gameWinner);
        handleModalOpen();
        stopTimer1();
        stopTimer2();
      } else if (winner == null) {
        // player1IsNextの情報が即時反映されないため、一時的な変数を作成
        // 関数内・条件式内だとuseEffectが使えなかったため、この方法で対処した
        const tempPlayer1IsNext = !isPlayer1Next;
        controlTimer(tempPlayer1IsNext);
        setIsPlayer1Next(!isPlayer1Next);
        if (props.gameMode === "cpu" && isPlayer1Next == true) {
          setCpuTurn(!cpuTurn);
        }
      }
    }
  };

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
            <Grid>
              {/* 開発する際、対戦形式を確認しやすくするため便宜的に書き込んでいます。 */}
              <Typography variant="h3" component="h3">
                {props.gameMode == "cpu" ? "vsCPU" : ""}
              </Typography>
            </Grid>
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
              <DisplayPlayerTurn playerTurn={isPlayer1Next} players={props.players} item />
              {displayTimer(count1)}/{displayTimer(count2)}
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Board board={currentBoard} onClick={canStartGame ? handleClick : null} />

      {/* それぞれの手番の情報を表示する */}
      <Grid justifyContent="center" alignItems="center" style={{ width: "50%" }}>
        <Paper className={classes.history}>
          <Typography variant="h4">History</Typography>
          <List>{moves}</List>
        </Paper>
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
