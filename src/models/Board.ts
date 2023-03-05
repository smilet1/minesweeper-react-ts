import {Cell} from "./Cell";
import {Bomb} from "./Bomb";
import {CellType} from "./CellType";
import "../constant/GameSatting"
import {BOMBS, COLS, ROWS} from "../constant/GameSatting";
import {GameStatus} from "./GameStatus";
import {Marker} from "./Marker";

export class Board {
    cells: Cell[][] = []
    bombs: Bomb[] = []
    countOpenCell: number = 0;
    gameStatus: GameStatus = GameStatus.PAUSE;
    flags: number = BOMBS;

    public copy(board: Board) {
        this.cells.push(...board.cells);
        this.bombs.push(...board.bombs);
        this.gameStatus = board.gameStatus;
        this.countOpenCell = board.countOpenCell;
        this.flags = board.flags;
    }

    public initCells() {
        for (let i = 0; i < ROWS; i++) {
            const row: Cell[] = []
            for (let j = 0; j < COLS; j++) {
                row.push(new Cell(this, i, j, CellType.NULL, Marker.NONE))
            }
            this.cells.push(row)
        }
    }

    public startGame() {
        this.setBombs();
    }


    public setBombs() {
        for (let i = 0; i < BOMBS; i++) {
            let x: number = this.random(0, ROWS - 1);
            let y: number = this.random(0, COLS - 1);
            if (this.cells[x][y].cellType === CellType.BOMB) {
                i--;
            } else {
                this.bombs.push(new Bomb(x, y));
                this.cells[x][y].cellType = CellType.BOMB;
            }
        }
        for (let i = 0; i < BOMBS; i++) {
            this.setCellValue(this.bombs[i].x, this.bombs[i].y);
        }

    }

    public setCellValue(x: number, y: number) {

        for (let i = x === 0 ? x : x - 1; i <= (x === ROWS - 1 ? x : x + 1); i++) {
            for (let j = y === 0 ? y : y - 1; j <= (y === COLS - 1 ? y : y + 1); j++) {
                if (i === x && j === y) {
                    continue;
                }
                if (this.cells[i][j].cellType === CellType.BOMB) {
                    continue;
                }
                this.cells[i][j].cellType += 1;
            }
        }
    }

    public openCell(x: number, y: number) {


        if(this.gameStatus !== GameStatus.PLAYING && this.cells[x][y].cellType !== CellType.BOMB){
            this.gameStatus = GameStatus.PLAYING;
        }


        if(this.cells[x][y].marker === Marker.FLAG){
            this.flags++;
        }

        if (!this.cells[x][y].isOpen) {
            this.cells[x][y].marker = Marker.NONE;
            this.cells[x][y].isOpen = true;
            this.countOpenCell++;
        }
    }


    public openNullCell(x: number, y: number) {
        if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
            if (!this.cells[x][y].isOpen) {
                this.openCell(x, y);
                if (this.cells[x][y].cellType === CellType.NULL) {
                    this.openNullCell(x - 1, y);
                    this.openNullCell(x, y - 1);
                    this.openNullCell(x + 1, y);
                    this.openNullCell(x, y + 1);
                    this.openNullCell(x - 1, y - 1);
                    this.openNullCell(x - 1, y + 1);
                    this.openNullCell(x + 1, y - 1);
                    this.openNullCell(x + 1, y + 1);
                }
            }
        }
    }

    public random(min: number = 0, max: number) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public openBombs() {

        console.log("LOOSE")
        this.gameStatus = GameStatus.LOOSE;
        this.bombs.map((bomb) => {
            this.cells[bomb.x][bomb.y].isOpen = true;
            this.cells[bomb.x][bomb.y].marker = Marker.NONE;
        })
    }

    public isWinGame() {

        if ((COLS * ROWS - this.countOpenCell) === this.bombs.length) {
            console.log("WIN")
            this.gameStatus = GameStatus.WIN
        }
    }
}