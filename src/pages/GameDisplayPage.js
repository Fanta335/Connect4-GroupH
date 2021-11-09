import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";

const Cell = (props) => {
  let color = "white";
  return (
    <td>
      <div className="cell" key={props.key}>
        <div className={color}></div>
      </div>
    </td>
  );
};

const Row = (props) => {
  return (
    <tr key={props.key}>
      {props.row.map((cell, cellIndex) => (
        <Cell cell={cell} key={cellIndex} />
      ))}
    </tr>
  );
};

const Board = (props) => {
  return (
    <table>
      {props.board.map((row, rowIndex) => (
        <Row row={row} key={rowIndex} />
      ))}
    </table>
  );
};

const Button = (props) => {
  return <button onClick={props.onClick}>New Game</button>;
};

const GameDisplayPage = () => {
  const [board, setBoard] = useState(new Array(6).fill(Array(7).fill(null)));

  const initGame = () => {
    let board = new Array(6).fill(Array(7).fill(null));
    // setBoard((prevState) => board);
    setBoard(() => board); // Yuki Ueno: エラーが出るので削除しました
  };

  return (
    <div className="game-display">
      <h1>Connect 4!</h1>
      <Button onClick={initGame} />
      <Board board={board} />
    </div>
  );
};

export default GameDisplayPage;
