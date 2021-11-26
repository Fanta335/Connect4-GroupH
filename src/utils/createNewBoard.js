/**
 * Boardを新規作成する
 * @param {number} x - boardの幅
 * @param {number} y - boardの高さ
 * @return {string[][]} - 新規作成したboard
 */

function createNewBoard(x, y) {
  let board = new Array(x);
  for (let i = 0; i < x; i++) {
    board[i] = new Array(y).fill(null);
  }
  return board;
}

export default createNewBoard;
