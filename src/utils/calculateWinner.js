/**
 * 勝者を返す関数
 * @param {string[][]} squares - 盤面を表す二次元配列
 * @param {number} victoryCondition - 勝利条件
 * @param {number} x - 石を置いた座標x（横方向）
 * @param {number} y - 石を置いた座標y（縦方向）
 * @returns {string} 勝者
 */
function calculateWinner(squares, victoryCondition, x, y) {
  if (isConnectedN(squares, victoryCondition, x, y)) {
    return squares[x][y];
  }
  return null;
}

/**
 * 座標(x, y)を中心にN個連続で並んでいるかどうか判定する関数
 * @param {string[][]} arr - 盤面を表す二次元配列
 * @param {number} victoryCondition - 勝利条件
 * @param {number} x - 石を置いた座標x（横方向）
 * @param {number} y - 石を置いた座標y（縦方向）
 * @returns {boolean} - true/false
 */
function isConnectedN(arr, victoryCondition, x, y) {
  let pattern = new RegExp(arr[x][y].repeat(victoryCondition));
  let width = arr.length;
  let height = arr[0].length;

  // 縦方向
  let str = "";
  for (let i = 1; i < victoryCondition; i++) {
    if (y - i >= 0) {
      str = arr[x][y - i] + str;
    }
  }
  for (let i = 0; i < victoryCondition; i++) {
    if (y + i < height) {
      str += arr[x][y + i];
    }
  }
  if (pattern.test(str)) {
    return true;
  }

  // 横方向
  str = "";
  for (let i = 1; i < victoryCondition; i++) {
    if (x - i >= 0) {
      str = arr[x - i][y] + str;
    }
  }
  for (let i = 0; i < victoryCondition; i++) {
    if (x + i < width) {
      str += arr[x + i][y];
    }
  }
  if (pattern.test(str)) {
    return true;
  }

  // 右斜め上方向
  str = "";
  for (let i = 1; i < victoryCondition; i++) {
    if (x - i >= 0 && y - i >= 0) {
      str = arr[x - i][y - i] + str;
    }
  }
  for (let i = 0; i < victoryCondition; i++) {
    if (x + i < width && y + i < height) {
      str += arr[x + i][y + i];
    }
  }
  if (pattern.test(str)) {
    return true;
  }

  // 左斜め上方向
  str = "";
  for (let i = 1; i < victoryCondition; i++) {
    if (x - i >= 0 && y + i < height) {
      str = arr[x - i][y + i] + str;
    }
  }
  for (let i = 0; i < victoryCondition; i++) {
    if (x + i < width && y - i >= 0) {
      str += arr[x + i][y - i];
    }
  }
  if (pattern.test(str)) {
    return true;
  }

  return false;
}

export default calculateWinner;
