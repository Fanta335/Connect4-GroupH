/**
 * Boardを新規作成する
 * @param {number} x - boardの幅
 * @param {number} y - boardの高さ
 * @return {string[][]} - 新規作成したboard
 */

function createNewBoard(x, y) {
  let result = new Array(x);
  for (let i = 0; i < x; i++) {
    result[i] = new Array(y).fill(null);
  }
  return result;
}

export default createNewBoard;
