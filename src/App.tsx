import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Board} from "./Logic";

const App: React.FC = () => {

  let board = new Board(10, 20);
  let squares = board.initSquares();

  for (let i = 0; i < 4; i++) board.moveShapeDown(squares);
  board.rotateShape(squares);

  console.log(squares);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
