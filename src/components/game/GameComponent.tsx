import React, {useEffect, useState} from 'react';
import "./Game.css"
import BoardComponent from "../board/BoardComponent";
import {Board} from "../../models/Board";
import HeaderComponent from "../header/HeaderComponent";
const GameComponent = () => {
    const [board, setBoard] = useState(new Board());
    const [onMouseDown, setOnMouseDown] = useState(false);

    useEffect(() =>{
        restart()
    },[])


    function restart(){
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.startGame();
        setBoard(newBoard);
    }

    return (
        <div className="game">
            <HeaderComponent restart={restart} gameStatus={board.gameStatus} flagCount={board.flags} clickHolder={onMouseDown}/>
            <BoardComponent board={board} setBoard={setBoard} setOnMouseDown={setOnMouseDown}/>
        </div>
    );
};

export default GameComponent;