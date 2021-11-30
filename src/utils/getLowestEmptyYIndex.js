/**
 * 指定した列の中で、要素が空の最小indexを返す
 * @param {string[][]} board - 盤面を表す二次元配列
 * @param {number} x - 指定する列
 * @returns {number} y（縦方向）のindex
 */
function getLowestEmptyYIndex(board, x) {
  for (let y = 0; y < board[0].length; y++) {
    if (board[x][y] === null) {
      return y;
    }
  }
  return false;
}

export default getLowestEmptyYIndex;
