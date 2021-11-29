/**
 * ボードの深いコピーを作成する
 * @param {string[][]} board - 盤面を表す二次元配列
 * @returns 複製した盤面を表す二次元配列
 */
const copyBoard = (board) => {
  const copiedBoard = [];
  board.forEach((array) => {
    copiedBoard.push([...array]);
  });
  return copiedBoard;
};

export default copyBoard;
