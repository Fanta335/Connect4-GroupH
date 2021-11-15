import React from "react";
import "./../pages/GameDisplayPage.css";
import Column from "./../board/Column.js";

const Board = (props) => {
  return (
    <div>
      <div className="flex-direction-row">
        {props.board.map((x, i) => (
          <Column column={x} key={i} x={i} onClick={props.onClick} />
        ))}
      </div>
    </div>
  );
};

export default Board;
