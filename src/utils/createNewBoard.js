/**
 * Boardを新規作成する
 * @param {number} x - boardの幅
 * @param {number} y - boardの高さ
 * @param {string} gameMode - 対戦形式
 * @return {string[][]} - 新規作成したboard
 */
import isPlayerFirst from "./isPlayerFirst";

function createNewBoard(x, y, gameMode) {
  const board = new Array(x);
  for (let i = 0; i < x; i++) {
    board[i] = new Array(y).fill(null);
  }
  // cpu対戦の時、プレイヤーが後攻だったら、ボードの初期状態をcpuが一石置いた状態にしておく。
  if (gameMode === "cpu") {
    if (isPlayerFirst() === false) {
      const randomNumber = Math.floor(Math.random() * x);
      board[randomNumber][0] = "Player2";
    }
  }
  return board;
}

export default createNewBoard;
