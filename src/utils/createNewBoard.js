/**
 * Boardを新規作成する
 * @param {number} x - boardの幅
 * @param {number} y - boardの高さ
 * @param {string} gameMode - 対戦形式
 * @return {string[][]} - 新規作成したboard
 */

function createNewBoard(x, y) {
  const board = new Array(x);
  for (let i = 0; i < x; i++) {
    board[i] = new Array(y).fill(null);
  }
  return board;
}

export default createNewBoard;
