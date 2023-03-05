import React, {FC} from 'react';
import "./Header.css"
import TimerComponent from "../timer/TimerComponent";
import {GameStatus} from "../../models/GameStatus";
import FlagComponent from "../flags/FlagComponent";

interface HeaderProps {
    restart: () => void;
    gameStatus: GameStatus;
    flagCount: number;
    clickHolder: boolean;
}

const HeaderComponent: FC<HeaderProps> = ({
                                              restart,
                                              gameStatus,
                                              flagCount,
                                              clickHolder,
                                          }) => {

    const updateIcon = () => {
        if (gameStatus === GameStatus.WIN) {
            return "btn_win";
        } else if (gameStatus === GameStatus.LOOSE) {
            return "btn_loose";
        }
    }

    return (
        <div className="header">
            <FlagComponent flagCount={flagCount}/>
            <button
                className={
                    `btn_restart btn_down_${clickHolder} ${updateIcon()}`
                }
                onClick={restart}></button>
            <TimerComponent gameStatus={gameStatus}/>
        </div>
    );
};

export default HeaderComponent;