import { Grid } from "@mui/material";
/**
 * タイマーの時間表示
 * @param {number} count - 時間(秒)
 * @returns タイマー表示（mm:ss）
 */
const displayTimer = (count) => {
  if (count >= 0) {
    const minute = Math.floor(count / 60);
    const displayMinute = minute >= 10 ? String(minute) : `0${String(minute)}`;
    const second = count % 60;
    const displaySecond = second >= 10 ? String(second) : `0${String(second)}`;
    // return `${displayMinute}:${displaySecond}`;
    return (
      <Grid sx={{ fontFamily: "MyFont", fontSize: "3em" }}>
        {displayMinute}:{displaySecond}
      </Grid>
    );
  }
  return "Time is up!";
};

export default displayTimer;
