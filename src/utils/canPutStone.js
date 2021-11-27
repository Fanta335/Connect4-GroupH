/**
 * 指定した列に石を置けるか判定する
 * @param {string[][]} board - 盤面を表す二次元配列
 * @param {number} x - 指定する列
 * @returns {boolean} - true/false
 */

function canPutStone(board, x) {
  let height = board[0].length;
  return board[x][height - 1] === null;
}

export default canPutStone;
