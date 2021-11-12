import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";
import Modal from "../components/Modal";

const Cell = (props) => {
  let color = "white";
  if (props.value === false) {
    color = "red";
  } else if (props.value === true) {
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
  const [nextPlayerIsRed, setNextPlayerIsRed] = useState(false);

  const initGame = () => {
    let board = initBoard;
    setBoard(board);
    setNextPlayerIsRed(false);
  };

  const copyBoard = (board) => {
    let copiedBoard = [];
    for (const array of board) {
      copiedBoard.push([...array]);
    }
    return copiedBoard;
  };

  // 置けるかどうかの判定を最初にする、別個に関数を用意して小分けにする
  const handleClick = (event) => {
    let nextBoard = copyBoard(board);
    const dataset = event.currentTarget.dataset;
    const x = dataset.x;
    for (let y = 0; y < board.length; y++) {
      if (nextBoard[x][y] == null) {
        nextBoard[x][y] = nextPlayerIsRed;
        setNextPlayerIsRed((prevState) => !prevState);
        break;
      }
    }
    setBoard(nextBoard);
  };

  return (
    <div className="game-display">
      <h1>Connect 4!</h1>
      <Button onClick={initGame} />
      <Board board={board} onClick={handleClick} />
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
