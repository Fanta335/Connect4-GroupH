import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";
import Modal from "../components/Modal";
import calculateWinner from "../utils/calculateWinner";
import Button from "@mui/material/Button";
import createNewBoard from "../utils/createNewBoard";

const Cell = (props) => {
  let color = "white";
  if (props.value === "Player1") {
    color = "red";
  } else if (props.value === "Player2") {
    color = "yellow";
  }
  return (
    <div className="cell" data-x={props.x} data-y={props.y} onClick={props.onClick}>
      <div className={color}></div>
    </div>
  );
};

const Column = (props) => {
  return (
    <div className="flex-direction-column-reverse">
      {props.column.map((y, i) => (
        <Cell value={y} key={i} x={props.x} y={i} onClick={props.onClick} />
      ))}
    </div>
  );
};

const Board = (props) => {
  return (
    <div>
      <div className="flex-direction-row">
        {props.board.map((x, i) => (
          <Column column={x} key={i} x={i} onClick={props.onClick} />
        ))}
      </div>
    </div>
  );
};

const InitButton = (props) => {
  return (
    <Button variant="contained" color="primary" style={{ height: "50px" }} onClick={props.onClick}>
      New Game
    </Button>
  );
};

const GameDisplayPage = () => {
  const initBoard = createNewBoard(7, 6);
  const [history, setHistory] = useState([
    {
      board: initBoard,
    },
  ]);
  const [isNextPlayerRed, setIsNextPlayerRed] = useState(false);
  const [gameWinner, setGameWinner] = useState("");
  const [stepNumber, setStepNumber] = useState(0);

  //モーダルの開閉
  const [open, setOpen] = useState(false);
  // ゲームが終了した時に起動する↓
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // ボードの深いコピーを作成
  // const copyBoard = (board) => {
  //   let copiedBoard = [];
  //   for (const array of board) {
  //     copiedBoard.push([...array]);
  //   }
  //   return copiedBoard;
  // };

  // 選択した列に石が置けるか判定
  const canPutStone = (board, x) => {
    if (board[x][5] != null) return false;
    return true;
  };

  // 選んだ列の一番下の空いているy座標を返す
  const getYIndex = (board, x) => {
    for (let y = 0; y < 6; y++) {
      if (board[x][y] == null) {
        return parseInt(y);
      }
    }
  };

  // 選んだ列の一番下に石を落とす。配列にはboolean値ではなくstringを入れる
  const putStone = (board, x, y) => {
    if (isNextPlayerRed) {
      board[x][y] = "Player2";
    } else {
      board[x][y] = "Player1";
    }
  };

  const handleClick = (event) => {
    if (gameWinner == "") {
      const renewedHistory = history.slice(0, stepNumber + 1);
      const current = renewedHistory[renewedHistory.length - 1].board;
      const dataset = event.currentTarget.dataset;
      const x = parseInt(dataset.x);

      if (canPutStone(current, x)) {
        let y = getYIndex(current, x);
        putStone(current, x, y);
        // 勝利判定
        let winner = calculateWinner(current, 4, x, y);
        if (winner != null) {
          setGameWinner(winner);
          handleOpen();
        } else if (winner == null) {
          // プレイヤーを変更
          setIsNextPlayerRed(!isNextPlayerRed);
          //盤面の状態変更
          setHistory(renewedHistory.concat([{ board: current }]));
          //何手目かの状態変更
          setStepNumber(renewedHistory.length);
        }
      }
    }
  };

  const jumpTo = (step) => {
    console.log(step);
    setStepNumber(step);
    setIsNextPlayerRed(step % 2 !== 0);
    console.log(stepNumber);
    console.log(isNextPlayerRed);
  };

  const moves = history.map((_, index) => {
    const desc = index ? "Go to move #" + index : "Go to game start";
    return (
      <li key={index}>
        <Button onClick={() => jumpTo(index)}>{desc}</Button>
      </li>
    );
  });

  const current = history[stepNumber];
  let status;
  if (gameWinner) {
    status = "Winner: " + gameWinner;
  } else {
    status = "Next player: " + (isNextPlayerRed ? "Player2" : "Player1");
  }

  return (
    <div className="game-display">
      <h1>Connect 4!</h1>
      <InitButton onClick={() => initGame} />
      <Board board={current.board} onClick={handleClick} />

      {/* それぞれの手番の情報を表示する */}
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      {/* 便宜的にゲームの勝者をお知らせするモーダルを貼り付けています。 */}
      <Modal handleOpen={handleOpen} handleClose={handleClose} open={open} gameWinner={gameWinner} />
    </div>
  );
};

export default GameDisplayPage;
