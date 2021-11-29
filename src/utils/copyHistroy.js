import copyBoard from "./copyBoard";

/**
 * historyの深いコピーを作成する
 * @param {*} history
 * @returns 複製したhistoryオブジェクト
 */

const copyHistory = (history) => {
  const copiedHistory = [];
  for (let i = 0; i < history.length; i++) {
    const board = history[i].board;
    const copiedBoard = copyBoard(board);
    const copiedCount1 = history[i].count1;
    const copiedCount2 = history[i].count2;

    copiedHistory.push({
      board: copiedBoard,
      count1: copiedCount1,
      count2: copiedCount2,
    });
  }
  return copiedHistory;
};

export default copyHistory;
