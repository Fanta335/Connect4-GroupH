/**
 * 勝者を返す関数
 * @param {string[][]} squares - 盤面を表す二次元配列
 * @param {number} n - 勝利条件（n個連続で並んだら勝ち）
 * @param {number} x - 石を置いた座標x（横方向）
 * @param {number} y - 石を置いた座標y（縦方向）
 * @returns {string} 勝者
 */
function calculateWinner(squares, n, x, y) {
  if (isConnectedN(squares, n, x, y)) return squares[x][y];
  return null;
}

/**
 * 座標(x, y)を中心にN個連続で並んでいるかどうか判定する関数
 * @param {string[][]} arr - 盤面を表す二次元配列
 * @param {number} n - 勝利条件（n個連続で並んだら勝ち）
 * @param {number} x - 石を置いた座標x（横方向）
 * @param {number} y - 石を置いた座標y（縦方向）
 * @returns {boolean}
 */
function isConnectedN(arr, n, x, y) {
  let pattern = new RegExp(arr[x][y].repeat(n));
  let width = arr.length;
  let height = arr[0].length;

  // 縦方向
  let str = "";
  for (let i = 1; i < n; i++) {
    if (y - i >= 0) str = arr[x][y - i] + str;
  }
  for (let i = 0; i < n; i++) {
    if (y + i < height) str += arr[x][y + i];
  }
  if (pattern.test(str)) return true;

  // 横方向
  str = "";
  for (let i = 1; i < n; i++) {
    if (x - i >= 0) str = arr[x - i][y] + str;
  }
  for (let i = 0; i < n; i++) {
    if (x + i < width) str += arr[x + i][y];
  }
  if (pattern.test(str)) return true;

  // 右斜め上方向
  str = "";
  for (let i = 1; i < n; i++) {
    if (x - i >= 0 && y - i >= 0) str = arr[x - i][y - i] + str;
  }
  for (let i = 0; i < n; i++) {
    if (x + i < width && y + i < height) str += arr[x + i][y + i];
  }
  if (pattern.test(str)) return true;

  // 左斜め上方向
  str = "";
  for (let i = 1; i < n; i++) {
    if (x - i >= 0 && y + i < height) str = arr[x - i][y + i] + str;
  }
  for (let i = 0; i < n; i++) {
    if (x + i < width && y - i >= 0) str += arr[x + i][y - i];
  }
  if (pattern.test(str)) return true;

  return false;
}

export default calculateWinner;
