import {Board} from "./Board";
import {CellType} from "./CellType";
import {Marker} from "./Marker";

export class Cell{
    readonly x: number; // Координата x
    readonly y: number; // Координата y
    cellType: CellType; // Значение хранящеяся в клетке [-1..8]
    marker: Marker;
    board: Board;
    isOpen: boolean; // Открытали клетка
    id: number; // Реакт ключ

    constructor(board: Board, x: number, y: number, cellType: CellType, marker: Marker) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.cellType = cellType;
        this.marker = marker;
        this.isOpen = false;
        this.id = Math.random();
    }

}