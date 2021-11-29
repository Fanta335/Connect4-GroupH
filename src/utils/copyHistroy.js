import copyBoard from "./copyBoard";

/**
 * historyの深いコピーを作成する
 * @param {*} originalHistory
 * @returns 複製したhistoryオブジェクト
 */
const copyHistory = (originalHistory) => {
  const copiedHistory = [];
  originalHistory.forEach((historyItem) => {
    const copiedBoard = copyBoard(historyItem.board);
    const copiedCount1 = historyItem.count1;
    const copiedCount2 = historyItem.count2;

    copiedHistory.push({
      board: copiedBoard,
      count1: copiedCount1,
      count2: copiedCount2,
    });
  });

  return copiedHistory;
};

export default copyHistory;
