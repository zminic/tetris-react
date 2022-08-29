import React from 'react';
import Square from './Square';
import * as logic from './Logic';

interface IBoardProps
{
    squares: logic.Square[][],
    style?: React.CSSProperties
}

const Board: React.FC<IBoardProps> = (props) => {
    const squares = props.squares.map((row, i) =>
        (
            <React.Fragment key={i}>
            {row.map((square, j) =>
                <Square
                    key={j}
                    data={square} />
            )}
            <div className="clear" />
            </React.Fragment>
        )
    );

    return (
      <div className="board" style={props.style}>
          {squares}
      </div>
    );
}

export default Board;