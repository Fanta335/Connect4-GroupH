import React, { useState } from "react";
import "./GameDisplayPage.css";
import Modal from "../components/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Board from "./../components/board/Board.js";
import DisplayPlayerTurn from "./../components/board/DisplayPlayerTurn.js";
import createNewBoard from "../utils/createNewBoard";
import canPutStone from "../utils/canPutStone";
import getLowestEmptyYIndex from "../utils/getLowestEmptyYIndex";
import calculateWinner from "../utils/calculateWinner";

const InitButton = (props) => {
  return (
    <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
      New Game
    </Button>
  );
};

const GameDisplayPage = (props) => {
  const initBoard = createNewBoard(props.borderSizeWidth, props.borderSizeHeight, props.gameMode);
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

  /**
   * ゲーム状態の初期化
   */
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
      <li key={index}>
        <Button onClick={() => jumpTo(index)}>{desc}</Button>
      </li>
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
    <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" component="h1">
        Connect 4!
      </Typography>

      {/* 開発する際、対戦形式を確認しやすくするため便宜的に書き込んでいます。 */}
      <Typography variant="h3" component="h3">
        {props.gameMode == "cpu" ? "vsCPU" : ""}
      </Typography>

      <Grid sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-end", mb: 2 }}>
        <InitButton onClick={initGame} />
        <DisplayPlayerTurn playerTurn={player1IsNext} playerName1={props.playerName1} playerName2={props.playerName2} />
      </Grid>
      <Board board={current} onClick={handleClick} />

      {/* それぞれの手番の情報を表示する */}
      <Grid className="game-info">
        <List>{moves}</List>
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
