/**
 * タイマーの時間表示
 * @param {number} count
 * @returns タイマー表示（mm:ss.00）
 */
const displayTimer = (count) => {
  if (count >= 0) {
    const minute = Math.floor(count / 100 / 60);
    const displayMinute = minute >= 10 ? String(minute) : "0" + String(minute);
    const second = count % (60 * 100);
    const secondFront = Math.floor(second / 100);
    const secondBack = second % 100;
    const displaySecondFront = secondFront >= 10 ? String(secondFront) : "0" + String(secondFront);
    const displaySecondBack = secondBack >= 10 ? String(secondBack) : "0" + String(secondBack);
    return `${displayMinute}:${displaySecondFront}:${displaySecondBack}`;
  } else {
    return "Time is up!";
  }
};

export default displayTimer;
