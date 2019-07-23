import React from 'react';
import * as logic from './Logic';
import Board from './Board';

interface IInfoProps
{
    nextShape: logic.Square[][];
    style?: React.CSSProperties;
}

const Info: React.FC<IInfoProps> = (props) => {

    return (
      <div className="info" style={props.style}>
        <div>
            <p>Next</p>
            <Board squares={props.nextShape}></Board>
        </div>
      </div>
    );
}

export default Info;