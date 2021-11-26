import { useState, useCallback, useRef } from "react";

function useTimer(timeControl) {
  const [count, setCount] = useState(timeControl);
  const intervalRef = useRef(null);
  /**
   * タイマーの開始
   */
  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
  }, []);

  /**
   * タイマーの停止
   */
  const stopTimer = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  /**
   * タイマーのリセット
   */
  const resetTimer = () => {
    setCount(timeControl);
  };

  /**
   * タイマーのセット
   * @param {number} setTime - タイマーにセットする時間
   */
  const setTimer = (setTime) => {
    setCount(setTime);
  };

  return [count, startTimer, stopTimer, resetTimer, setTimer];
}

export default useTimer;
