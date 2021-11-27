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
import displayTimer from "../utils/displayTimer";
import useTimer from "../utils/useTimer";

const InitButton = (props) => {
  return (
    <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
      Start New Game
    </Button>
  );
};

const GameDisplayPage = (props) => {
  const initBoard = createNewBoard(props.borderSizeWidth, props.borderSizeHeight);
  const timeControl = props.timeMinControl * 60 + props.timeSecControl;
  const [count1, startTimer1, stopTimer1, resetTimer1, setTimer1] = useTimer(timeControl);
  const [count2, startTimer2, stopTimer2, resetTimer2, setTimer2] = useTimer(timeControl);
  const [player1IsNext, setPlayer1IsNext] = useState(true);
  const [gameWinner, setGameWinner] = useState("");
  const [history, setHistory] = useState([
    {
      board: initBoard,
      count1: timeControl,
      count2: timeControl,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [canStartGame, setCanStartGame] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
    setPlayer1IsNext(true);
    setStepNumber(0);
    setCanStartGame(true);
    stopTimer1();
    stopTimer2();
    resetTimer1();
    resetTimer2();
    startTimer1();
  };

  /**
   * ボードの深いコピーを作成する
   * @param {string[][]} board - 盤面を表す二次元配列
   * @returns 複製した盤面を表す二次元配列
   */
  const copyBoard = (board) => {
    const copiedBoard = [];
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
      const board = historyItem.board;
      const copiedBoard = copyBoard(board);
      const copiedCount1 = historyItem.count1;
      const copiedCount2 = historyItem.count2;

      copiedHistory.push({
        board: copiedBoard,
        count1: copiedCount1,
        count2: copiedCount2,
      });
    }
    return copiedHistory;
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
      <li key={index}>
        <Button onClick={() => jumpTo(index)}>{desc}</Button>
      </li>
    );
  });

  const currentBoard = history[stepNumber].board;

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
        console.log(gameWinner);
        handleModalOpen();
        stopTimer1();
        stopTimer2();
      } else if (winner == null) {
        // player1IsNextの情報が即時反映されないため、一時的な変数を作成
        // 関数内・条件式内だとuseEffectが使えなかったため、この方法で対処した
        const tempPlayer1IsNext = !player1IsNext;
        controlTimer(tempPlayer1IsNext);
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
        {displayTimer(count1)}/{displayTimer(count2)}
      </Grid>
      <Board board={currentBoard} onClick={canStartGame ? handleClick : null} />

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
