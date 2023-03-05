import React, {FC} from 'react';
import './Flag.css'
interface FlagProps{
    flagCount: number;
}
const FlagComponent: FC<FlagProps> = ({flagCount}) => {
    return (
        <div className="flag_board">
            <div className={`flag flag_${(flagCount / 100) % 10}`}></div>
            <div className={`flag flag_${(flagCount/10) % 10}`}></div>
            <div className={`flag flag_${flagCount % 10}`}></div>
        </div>
    );
};

export default FlagComponent;
