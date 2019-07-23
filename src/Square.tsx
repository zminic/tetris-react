import React from 'react';
import * as logic from "./Logic";

interface ISquareProps
{
    data: logic.Square
}

const Square: React.FC<ISquareProps> = (props) => 
{
    let classNames = ['square'];

    if (props.data.isEmpty) classNames.push('empty');

    return (
        <div className={classNames.join(' ')} style={{backgroundColor: props.data.color, borderColor: props.data.color}}>
        </div>
    );
};

export default Square;