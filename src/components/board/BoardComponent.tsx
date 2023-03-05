import React, {FC} from 'react';
import {Board} from "../../models/Board";
import CellComponent from "../cell/CellComponent";
import {CellType} from "../../models/CellType";
import {Cell} from "../../models/Cell";
import {GameStatus} from "../../models/GameStatus";
import "./Board.css"

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    setOnMouseDown: (onMouseDown: boolean)=> void;
}

const BoardComponent: FC<BoardProps> = ({board,setBoard, setOnMouseDown}) => {
    const boardUpdate = (cell: Cell) => {
        if(cell.cellType === CellType.NULL){
            board.openNullCell(cell.x,cell.y)
        }
        if(cell.cellType === CellType.BOMB){
            board.openBombs();
        }
        board.openCell(cell.x,cell.y);
        board.isWinGame()

        let newBoard: Board = new Board();
        newBoard.copy(board);
        setBoard(newBoard);
    }

    const updateCountFlag = (i: number)=>{

        board.flags += i;
        let newBoard: Board = new Board();
        newBoard.copy(board);
        setBoard(newBoard);
    }
    const updateMouseDown = (onDown: boolean)=>{
        setOnMouseDown(onDown);
    }

    return (
        <div style={(board.gameStatus !== GameStatus.PAUSE && board.gameStatus !== GameStatus.PLAYING)?{
            pointerEvents: "none"
        }:{}}
             className="board">
            {
                board.cells.map((row,index) =>
                <React.Fragment key={index}>

                    {row.map(cell =>
                        <CellComponent
                            cellType={cell.cellType}
                            cell={cell} key={cell.id}
                            boardUpdate={boardUpdate}
                            countFlag={board.flags}
                            updateCountFlag={updateCountFlag}
                            updateMouseDown={updateMouseDown}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default BoardComponent;