import React, {FC, useEffect, useState} from 'react';
import {CellType} from "../../models/CellType";
import "./Cell.css"
import {Cell} from "../../models/Cell";
import {Marker} from "../../models/Marker";


interface CellProps {
    cellType: CellType;
    cell: Cell;
    boardUpdate: (cell: Cell) => void;
    countFlag: number;
    updateCountFlag: (i: number) => void;
    updateMouseDown: (onDown: boolean) => void;
}

const CellComponent: FC<CellProps> = ({cellType, cell, boardUpdate, countFlag, updateCountFlag, updateMouseDown}) => {
    const [, setIsOpen] = useState(cell.isOpen)
    const [mask, setMask] = useState("")
    const [, setMarker] = useState("")
    const [onClick, setOnClick] = useState("close_cell")

    useEffect(() => {
        setMask(setAsset());
    }, [])

    const setAsset = () => {
        switch (cellType) {
            case CellType.FIRST_BOMB:
                return "first_bomb";
            case CellType.BOMB:
                return "bomb";
            case CellType.ONE:
                return "one"
            case CellType.TWO:
                return "two"
            case CellType.THREE:
                return "three"
            case CellType.FOUR:
                return "four"
            case CellType.FIVE:
                return "five"
            case CellType.SIX:
                return "six"
            case CellType.SEVEN:
                return "seven"
            case CellType.EIGHT:
                return "eight"
            default:
                return "open_cell";
        }
    }

    const openCell = () => {
        if (cell.cellType === CellType.BOMB) {
            setMask("first_bomb");
        }
        cell.marker = Marker.NONE;
        boardUpdate(cell);
        setIsOpen(true)
    }

    return (
        <div
            onMouseDown={(e) => {
                if (e.button === 0) {
                    if(!cell.isOpen){
                    updateMouseDown(true);
                    setOnClick("open_cell")}
                }
                if (e.button === 2) {
                    e.preventDefault();
                    if (cell.isOpen === false) {
                        if (cell.marker === Marker.FLAG) {
                            updateCountFlag(1);
                        }
                        if (cell.marker === Marker.NONE && countFlag > 0) {
                            cell.marker = Marker.FLAG
                            updateCountFlag(-1);
                        } else if (cell.marker === Marker.FLAG || countFlag <= 0) {
                            cell.marker = Marker.QU
                        } else {
                            cell.marker = Marker.NONE
                        }
                        setMarker(cell.marker)
                    }
                }
            }
            }
            onMouseUp={(e) => {
                if (e.button === 0) {
                    updateMouseDown(false);
                    setOnClick("close_cell")
                }
            }
            }
            onClick={(e) => {
                openCell()
            }}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
            className={`cell  ${cell.isOpen ? mask : onClick} ${cell.marker}`}>
        </div>
    );
};

export default CellComponent;