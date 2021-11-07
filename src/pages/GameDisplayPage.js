import React from "react";
import { useState } from "react";
import "./GameDisplayPage.css";

const Cell = (props) => {
    let color = "white";
    if (props.value === false) {
        color = "red";
    } else if (props.value === true) {
        color = "yellow";
    }
    return (
        <td>
            <div className="cell" data-columnindex={props.columnindex} onClick={props.onClick}>
                <div className={color}></div>
            </div>
        </td>
    );
}

const Row = (props) => {
    return (
        <tr>
            {props.row.map((cell, columnindex) => (
                <Cell 
                    value={cell} 
                    key={columnindex} 
                    columnindex={columnindex}  
                    onClick={props.onClick} 
                />))}
        </tr>
    );
}

const Board = (props) => {
    return (
        <table>
            <tbody>
                {props.board.map((row, rowindex) => (
                    <Row 
                        row={row} 
                        key={rowindex}
                        onClick={props.onClick} 
                    />))}
            </tbody>
        </table>
    ); 
}

const Button = (props) => {
  return <button onClick={props.onClick}>New Game</button>;
};

const GameDisplayPage = () => {
    const [board, setBoard] = useState(new Array(6).fill(Array(7).fill(null)));
    const [nextPlayerIsRed, setNextPlayerIsRed] = useState(false);

    const initGame = () => {
        let board = new Array(6).fill(Array(7).fill(null))
        setBoard(board)
        setNextPlayerIsRed(false)
    }

    const handleClick = (event) => {
        let nextBoard = board.slice();
        const dataset = event.currentTarget.dataset;
        const columnIndex = dataset.columnindex;
        for (let r=board.length-1; r >= 0; r--) {
            if (nextBoard[r][columnIndex] == null) {
                nextBoard[r][columnIndex] = nextPlayerIsRed;
                setNextPlayerIsRed(prevState => !prevState)
                break;
            }
        }
        setBoard(nextBoard) 
    }

    return (
        <div className='game-display'>
            <h1>Connect 4!</h1>
            <Button 
                onClick={initGame}
            />
            <Board 
                board={board} 
                onClick={handleClick}
            />
        </div>
    );
}

export default GameDisplayPage;
