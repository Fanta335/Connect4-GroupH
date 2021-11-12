import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";
import Modal from "../components/Modal";
import isConnectedN from "../utils/calculateWinner";
const Cell = (props) => {
  let color = "white";
  if (props.value === "player1") {
    color = "red";
  } else if (props.value === "player2") {
    color = "yellow";
  }
  return (
    <div>
      <div className="cell" data-columnindex={props.columnIndex} data-rowindex={props.rowIndex} onClick={props.onClick}>
        <div className={color}></div>
      </div>
    </div>
  );
};

const Row = (props) => {
  return (
    <div className="d-flex">
      {props.column.map((cell, columnIndex) => (
        <Cell
          value={cell}
          key={columnIndex}
          columnIndex={columnIndex}
          rowIndex={props.rowIndex}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
};

const Board = (props) => {
  return (
    <div>
      <div className="d-flex flex-direction-column">
        {props.board.map((column, rowIndex) => (
          <Row column={column} key={rowIndex} rowIndex={props.board.length - 1 - rowIndex} onClick={props.onClick} />
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
  let tbl = new Array(6);
  for (let y = 0; y < 6; y++) {
    tbl[y] = new Array(7).fill(null);
  }

  const [board, setBoard] = useState(tbl);
  const [nextPlayerIsRed, setNextPlayerIsRed] = useState(false);

  const initGame = () => {
    let board = tbl;
    setBoard(board);
    setNextPlayerIsRed(false);
  };

  const handleClick = (event) => {
    let nextBoard = forLoopCopy(board);
    const dataset = event.currentTarget.dataset;
    const columnIndex = dataset.columnindex;
    let rowIndex = null;
    for (let row = board.length - 1; row >= 0; row--) {
      if (nextBoard[row][columnIndex] === null) {
        rowIndex = row;
        if (nextPlayerIsRed) {
          nextBoard[row][columnIndex] = "player2";
        } else {
          nextBoard[row][columnIndex] = "player1";
        }
        setNextPlayerIsRed((prevState) => !prevState);
        break;
      }
    }
    setBoard(nextBoard);
    console.log(nextBoard);
    console.log("x is " + rowIndex);
    console.log("y is " + columnIndex);
    console.log(nextBoard[rowIndex][columnIndex]);

    //勝利者判定
    if (isConnectedN(nextBoard, 4, rowIndex, columnIndex)) {
      if (nextPlayerIsRed) {
        console.log("player2");
      } else {
        console.log("player1");
      }
    } else {
      console.log("unknown!");
    }
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
//配列を非破壊的にコピー
const forLoopCopy = (target2d) => {
  let result = [];
  for (const array of target2d) {
    result.push([...array]);
  }
  return result;
};

export default GameDisplayPage;
