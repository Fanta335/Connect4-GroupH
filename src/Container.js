import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import React from "react";
import Home from "./pages/Home.js";
import Settings from "./pages/Settings";
import GameDisplayPage from "./pages/GameDisplayPage";
import Header from "./components/Header";
import createNewBoard from "./utils/createNewBoard";
import canPutStone from "./utils/canPutStone";
import getLowestEmptyYIndex from "./utils/getLowestEmptyYIndex";
import calculateWinner from "./utils/calculateWinner";
import Button from "@mui/material/Button";

const Container = () => {
  // Home.js
  const [gameMode, setGameMode] = useState("player");
  const [cpuStrength, setCpuStrength] = useState("easy");
  // Settings.js
  const [borderSizeHeight, setBorderSizeHeight] = useState(6);
  const [borderSizeWidth, setBorderSizeWidth] = useState(7);
  const [victoryCondition, setVictoryCondition] = useState(4);
  const [playerName1, setPlayerName1] = useState("Player1");
  const [playerName2, setPlayerName2] = useState("Player2");
  // GameDisplayPage.js
  const initBoard = createNewBoard(borderSizeWidth, borderSizeHeight);
  const [isNextPlayerRed, setIsNextPlayerRed] = useState(false);
  const [gameWinner, setGameWinner] = useState("");
  const [history, setHistory] = useState([
    {
      board: initBoard,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  //モーダルの開閉
  const [open, setOpen] = useState(false);
  // ゲームが終了した時に起動する↓
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputGameModeAndCpuStrengthChange = (event) => {
    const name = event.target.name;
    if (name === "gameMode") {
      setGameMode(event.target.value);
    } else if (name === "cpuStrength") {
      setCpuStrength(event.target.value);
    }
  };

  const handleInputPlayerNameChange = (event) => {
    const name = event.target.name;
    if (name === "playerName1") {
      setPlayerName1(event.target.value);
    } else if (name === "playerName2") {
      setPlayerName2(event.target.value);
    }
  };

  const handleInputNumberChange = (event) => {
    const min = parseInt(event.target.min);
    const max = parseInt(event.target.max);
    let tempValue = "";
    if (event.target.value !== "") {
      tempValue = parseInt(event.target.value);
    }
    if (tempValue > max || tempValue < min) {
      return;
    }
    const name = event.target.name;
    if (name === "borderSizeHeight") {
      setBorderSizeHeight(tempValue);
    } else if (name === "borderSizeWidth") {
      setBorderSizeWidth(tempValue);
    } else if (name === "victoryCondition") {
      setVictoryCondition(tempValue);
    }
  };

  // ゲームの状態の初期化
  const initGame = () => {
    setHistory([
      {
        board: initBoard,
      },
    ]);
    setGameWinner("");
    setIsNextPlayerRed(false);
    setStepNumber(0);
  };

  //ボードの深いコピーを作成
  const copyBoard = (board) => {
    let copiedBoard = [];
    for (const array of board) {
      copiedBoard.push([...array]);
    }
    return copiedBoard;
  };
  // historyの深いコピーを作成
  const copyHistory = (history) => {
    let renewedHistory = [];
    for (const historyItem of history) {
      let board = historyItem.board;
      let copiedBoard = copyBoard(board);
      renewedHistory.push({
        board: copiedBoard,
      });
    }
    return renewedHistory;
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

  // 選んだ列の一番下に石を落とす。配列にはboolean値ではなくstringを入れる
  const putStone = (board, x, y) => {
    if (isNextPlayerRed) {
      board[x][y] = "Player2";
    } else {
      board[x][y] = "Player1";
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsNextPlayerRed(step % 2 !== 0);
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
      let winner = calculateWinner(nextBoard, victoryCondition, x, y);
      if (winner != null) {
        setGameWinner(winner);
        handleOpen();
      } else if (winner == null) {
        // プレイヤーを変更
        setIsNextPlayerRed(!isNextPlayerRed);
      }
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home gameMode={gameMode} cpuStrength={cpuStrength} onChange={handleInputGameModeAndCpuStrengthChange} />
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <Settings
              borderSizeHeight={borderSizeHeight}
              borderSizeWidth={borderSizeWidth}
              victoryCondition={victoryCondition}
              playerName1={playerName1}
              playerName2={playerName2}
              onPlayerNameChange={handleInputPlayerNameChange}
              onNumberChange={handleInputNumberChange}
            />
          }
        ></Route>
        <Route
          path="/game"
          element={
            <GameDisplayPage
              gameWinner={gameWinner}
              isNextPlayerRed={isNextPlayerRed}
              moves={moves}
              current={current}
              open={open}
              initGame={initGame}
              onClick={handleClick}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};

export default Container;
