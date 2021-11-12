import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";
import "./../utils/calculateWinner";
import Modal from "../components/Modal";
import calculateWinner from "./../utils/calculateWinner";

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

const Button = (props) => {
  return <button onClick={props.onClick}>New Game</button>;
};

const GameDisplayPage = () => {
  //タイムトラベル機能の実装
  // const [history,setHistory] = useState({
  //   history : [{
  //     board: Array(6).fill(Array(7).fill(null)),
  //   }],
  //   isFirstMove: true,
  // });
  let initBoard = new Array(7);
  for (let y = 0; y < 7; y++) {
    initBoard[y] = new Array(6).fill(null);
  }

  const [board, setBoard] = useState(initBoard);
  const [nextPlayerIs, setNextPlayerIs] = useState("Player1");
  const [gameWinner, setGameWinner] = useState("");

  // ゲームの状態の初期化
  const initGame = () => {
    let board = initBoard;
    setBoard(() => board);
    setNextPlayerIs(() => "Player1");
    setGameWinner(() => "");
  };

  // ボードの深いコピーを作成
  const copyBoard = (board) => {
    let copiedBoard = [];
    for (const array of board) {
      copiedBoard.push([...array]);
    }
    return copiedBoard;
  };

  // 選択した列に石が置けるか判定
  const canPutStone = (board, x) => {
    if (board[x][5] != null) return false;
    return true;
  };

  // プレイヤーを変更
  const changePlayer = (nextPlayerIs) => {
    if (nextPlayerIs == "Player1") {
      setNextPlayerIs(() => "Player2");
    } else if (nextPlayerIs == "Player2") {
      setNextPlayerIs(() => "Player1");
    }
  };

  // 選んだ列の一番下の空いているy座標を返す
  const getYIndex = (board, x) => {
    for (let y = 0; y < 6; y++) {
      if (board[x][y] == null) {
        return y;
      }
    }
  };

  // 選んだ列の一番下に石を落とす。配列にはboolean値ではなくstringを入れる
  const putStone = (board, x, y) => {
    board[x][y] = nextPlayerIs;
  };

  const handleClick = (event) => {
    if (gameWinner == "") {
      let nextBoard = copyBoard(board);
      let dataset = event.currentTarget.dataset;
      let x = dataset.x;
      if (canPutStone(nextBoard, x)) {
        let y = getYIndex(nextBoard, x);
        putStone(nextBoard, x, y);
        // 勝利判定
        let winner = calculateWinner(nextBoard, 4, x, y);
        if (winner != null) {
          setGameWinner(() => winner);
          setBoard(() => nextBoard);
        } else if (winner == null) {
          changePlayer(nextPlayerIs);
          setBoard(nextBoard);
        }
      }
    }
  };

  return (
    <div className="game-display">
      <h1>Connect 4!</h1>
      <Button onClick={initGame} />
      <Board board={board} onClick={handleClick} />
      <h1>{gameWinner}</h1>
      {/* それぞれの手番の情報を表示する */}
      <div className="game-info">
        <div>{/*status*/}</div>
        <ol>{/*todo*/}</ol>
      </div>
      {/* 便宜的にゲームの勝者をお知らせするモーダルを貼り付けています。 */}
      <Modal />
    </div>
  );
};

export default GameDisplayPage;
