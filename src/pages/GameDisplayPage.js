import React, {useState} from 'react';

const Cell = () => {
    let color = "white";
    return (
        <td>
            <div className="cell">
                <div className={color}></div>
            </div>
        </td>
    );
}

const Row = (props) => {
    return (
        <tr>
            {props.row.map(() => (<Cell />))}
        </tr>
    );
}

const Board = (props) => {
    return (
        <table>
            {props.board.map((row) => (<Row row={row}/>))}
        </table>
    ); 
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>New Game</button>
    );
}

const GameDisplayPage = () => {
    const [board, setBoard] = useState(new Array(6).fill(Array(7).fill(null)));

    const initGame = () => {
        let board = new Array(6).fill(Array(7).fill(null))
        setBoard(prevState => board)
    }

    return (
        <div className='game-display'>
            <h1>Connect 4!</h1>
            <Button 
                onClick={initGame}
            />
            <Board 
                board={board} 
            />
        </div>
    );
}

export default GameDisplayPage;