import React, {FC, useEffect} from 'react';
import "./Timer.css"
import {GameStatus} from "../../models/GameStatus";

interface TimerProps{
    gameStatus: GameStatus;
}
const TimerComponent: FC<TimerProps> = ({gameStatus}) => {
    const [time, setTime] = React.useState(0);
    const [timerOn, setTimerOn] = React.useState(false);

    useEffect(()=>{
        if(gameStatus === GameStatus.PLAYING){
            setTimerOn(true);
        }else if(gameStatus === GameStatus.PAUSE){
            setTime(0);
            setTimerOn(false);
        }else {
            setTimerOn(false);
        }
    },[gameStatus])

    React.useEffect(() => {
        let interval: NodeJS.Timer | undefined;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn]);

    return (
        <div className="timer_board">
            <div className={`timer timer_${(Math.floor((time / 1000) /100))%10}`}></div>
            <div className={`timer timer_${(Math.floor((time / 1000)/10))%10}`}></div>
            <div className={`timer timer_${(Math.floor((time / 1000)))%10}`}></div>
        </div>
    );
};

export default TimerComponent;