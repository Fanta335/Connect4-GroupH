import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";
import Modal from "../components/Modal";
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
  //タイムトラベル機能の実装
  // const [history,setHistory] = useState({
  //   history : [{
  //     board: Array(6).fill(Array(7).fill(null)),
  //   }],
  //   isFirstMove: true,
  // });

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
