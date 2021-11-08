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

  // Yuki Ueno: is defined but never used のエラーが出るので、追加しました。書き換えていただいて問題ないです。
  const winner = calculateWinner(board, 4);
  if (winner) {
    console.log("Winner is" + winner);
  }

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

/**
 * 勝者を返す関数
 * @param {string[]} squares - 盤面を表す配列
 * @param {*} n - 勝利条件（n個連続で並んだら勝ち）
 * @returns {string} 勝者を返す
 */
function calculateWinner(squares, n) {
  if (isConnectedN(squares, "O", n)) return "O";
  if (isConnectedN(squares, "X", n)) return "X";
  return null;
}

/**
 * N個連続で並んでいるかどうか判定する関数
 * @param {string[]} arr - 盤面を表す配列
 * @param {string} user - userの名前('X', 'O' など)
 * @param {number} n - 勝利条件（n個連続で並んだら勝ち）
 * @returns {boolean}
 */
function isConnectedN(arr, user, n) {
  let pattern = new RegExp(user.repeat(n));
  let width = arr.length;
  let height = arr[0].length;

  // 縦方向
  for (let i = 0; i < width; i++) {
    let str = arr[i].join("");
    if (pattern.test(str)) return true;
  }

  // 横方向
  for (let i = 0; i < height; i++) {
    let str = "";
    for (let j = 0; j < width; j++) {
      str += arr[j][i];
    }
    if (pattern.test(str)) return true;
  }

  // 斜め方向走査の前処理
  let dummyArr = Array(height - n).fill(Array(height).fill(null));
  arr = dummyArr.concat(arr);
  arr = arr.concat(dummyArr);

  // 右斜め上方向
  for (let i = 0; i < arr.length - height + 1; i++) {
    let str = "";
    for (let j = 0; j < height; j++) {
      str += arr[i + j][j];
    }
    if (pattern.test(str)) return true;
  }

  // 左斜め上方向
  for (let i = height - 1; i < arr.length; i++) {
    let str = "";
    for (let j = 0; j < height; j++) {
      str += arr[i - j][j];
    }
    if (pattern.test(str)) return true;
  }

  return false;
}
