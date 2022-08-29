import React from 'react';
import * as logic from './Logic';
import Board from './Board';

interface IInfoProps
{
    nextShape: logic.Square[][];
    style?: React.CSSProperties;
    onPause?: (event: React.MouseEvent) => void;
    onNewGame?: (event: React.MouseEvent) => void;
    lineCount: number;
    gameState: string;
}

const Info: React.FC<IInfoProps> = (props) => {

    return (
      <div className="info" style={props.style}>
        <div>
            <fieldset>
                <legend>Next</legend>
                <Board squares={props.nextShape}></Board>
            </fieldset>

            <fieldset>
                <legend>Actions</legend>
                <p><button type="button" onClick={props.onNewGame} >New game</button></p>
                <p><button type="button" onClick={props.onPause}>{props.gameState === 'paused' ? 'Start' : 'Pause'}</button></p>
            </fieldset>

            <fieldset>
                <legend>Stats</legend>
                <p>Lines: <span className="highlight">{props.lineCount}</span></p>
            </fieldset>
            
            <fieldset>
                <legend>Keyboard controls</legend>
                <p>Left: <span className="highlight">Left arrow</span></p>
                <p>Right: <span className="highlight">Right arrow</span></p>
                <p>Rotate: <span className="highlight">Up arrow</span></p>
                <p>Speed up: <span className="highlight">Down arrow</span></p>
                <p>Pause: <span className="highlight">P</span></p>
                <p>Drop: <span className="highlight">Space</span></p>
            </fieldset>

        </div>
      </div>
    );
}

export default Info;