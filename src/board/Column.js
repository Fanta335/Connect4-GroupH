import React from "react";
import "./Board.css";
import Cell from "./../board/Cell.js";

const Column = (props) => {
  return (
    <div className="flex-direction-column-reverse">
      {props.column.map((y, i) => (
        <Cell value={y} key={i} x={props.x} y={i} onClick={props.onClick} />
      ))}
    </div>
  );
};

export default Column;
