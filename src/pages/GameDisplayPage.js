import React, { useState } from "react";
import "./GameDisplayPage.css";
import {
  Button,
  Grid,
  List,
  Card,
  Paper,
  Typography,
  createTheme
} from "@mui/material";

import Modal from "../components/Modal";
// import Typography from "@mui/material/Typography";
import Board from "./../components/board/Board.js";
import DisplayPlayerTurn from "./../components/board/DisplayPlayerTurn.js";
import createNewBoard from "../utils/createNewBoard";
import canPutStone from "../utils/canPutStone";
import getLowestEmptyYIndex from "../utils/getLowestEmptyYIndex";
import calculateWinner from "../utils/calculateWinner";
import { makeStyles } from "@mui/styles";
const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  history: {
    margin: "40px",
    padding: theme.spacing(3),
  },
  historyCard: {
    textAlign: "center",
    margin: theme.spacing(2)
  },
  infoCard: {
    padding: theme.spacing(2)
  }
});
const InitButton = (props) => {
  return (
    <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
      New Game
    </Button>
  );
};

const GameDisplayPage = (props) => {
  const initBoard = createNewBoard(props.borderSizeWidth, props.borderSizeHeight);
  const [player1IsNext, setPlayer1IsNext] = useState(true);
  const [gameWinner, setGameWinner] = useState("");
  const [history, setHistory] = useState([
    {
      board: initBoard,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);


  // ゲームが終了した時に起動する↓
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  const initGame = () => {
    setHistory([
      {
        board: initBoard,
      },
    ]);
    setGameWinner("");
    setPlayer1IsNext(true);
    setStepNumber(0);
  };

  /**
   * ボードの深いコピーを作成する
   * @param {string[][]} board - 盤面を表す二次元配列
   * @returns 複製した盤面を表す二次元配列
   */
  const copyBoard = (board) => {
    let copiedBoard = [];
    for (const array of board) {
      copiedBoard.push([...array]);
    }
    return copiedBoard;
  };

  /**
   * historyの深いコピーを作成する
   * @param {*} history
   * @returns 複製したhistoryオブジェクト
   */
  const copyHistory = (history) => {
    let copiedHistory = [];
    for (const historyItem of history) {
      let board = historyItem.board;
      let copiedBoard = copyBoard(board);
      copiedHistory.push({
        board: copiedBoard,
      });
    }
    return copiedHistory;
  };

  // historyを任意の手番に遡る際にhistoryを更新する
  const updateHistory = (history, step) => {
    let updatedHistory = [];
    for (let i = 0; i <= step; i++) {
      let board = history[i].board;
      let copiedBoard = copyBoard(board);
      updatedHistory.push({
        board: copiedBoard,
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
    if (player1IsNext) {
      board[x][y] = "Player1";
    } else {
      board[x][y] = "Player2";
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setPlayer1IsNext(step % 2 === 0);
    setHistory(updateHistory(history, step));
    setGameWinner("");
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
        >{desc}</Button>
      </Card>
    );
  });

  const current = history[stepNumber].board;

  const handleClick = (event) => {
    if (gameWinner !== "") return;
    const renewedHistory = copyHistory(history);
    const current = renewedHistory[stepNumber].board;
    let nextBoard = copyBoard(current);
    const dataset = event.currentTarget.dataset;
    const x = parseInt(dataset.x);

    if (canPutStone(nextBoard, x)) {
      let y = getLowestEmptyYIndex(nextBoard, x);
      putStone(nextBoard, x, y);
      //盤面の状態変更
      setHistory(renewedHistory.concat([{ board: nextBoard }]));
      //何手目かの状態変更
      setStepNumber(stepNumber + 1);
      // 勝利判定
      let winner = calculateWinner(nextBoard, props.victoryCondition, x, y);
      if (winner != null) {
        setGameWinner(winner);
        handleModalOpen();
      } else if (winner == null) {
        // プレイヤーを変更
        setPlayer1IsNext(!player1IsNext);
      }
    }
  };

  return (
    <Grid
      sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
      className={classes.root}
    >
      <Grid
        sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-end", mb: 2, mt:2 }}
      >
        <Card className={classes.infoCard}>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-end"
          >
            <Grid flexDirection="column">
              <Typography variant="h5" component="h5" sx={{ textAlign: "center" }}>
                Reset
              </Typography>
              <InitButton onClick={initGame} item/>
            </Grid>
            <Grid flexDirection="column">
              <Typography variant="h5" component="h5" sx={{ textAlign: "right" }}>
                Next Player
              </Typography>
              <DisplayPlayerTurn
                playerTurn={isNextPlayerRed}
                playerName1={props.playerName1}
                playerName2={props.playerName2}
                item
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Board board={current} onClick={handleClick} />

      {/* それぞれの手番の情報を表示する */}
      <Grid
        justifyContent="center"
        alignItems="center"
        style={{width: "50%"}}>
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
        playerTurn={player1IsNext}
        playerName1={props.playerName1}
        playerName2={props.playerName2}
      />
    </Grid>
  );
};

export default GameDisplayPage;
