import copyBoard from "./copyBoard";

/**
 * historyの深いコピーを作成する
 * @param {*} history
 * @returns 複製したhistoryオブジェクト
 */

const copyHistory = (history) => {
  let copiedHistory = [];
  for (const historyItem of history) {
    const board = historyItem.board;
    const copiedBoard = copyBoard(board);
    const copiedCount1 = historyItem.count1;
    const copiedCount2 = historyItem.count2;

    copiedHistory.push({
      board: copiedBoard,
      count1: copiedCount1,
      count2: copiedCount2,
    });
  }
  return copiedHistory;
};

export default copyHistory;
