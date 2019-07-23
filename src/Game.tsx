import React, {Component} from 'react';
import './Game.css';
import * as logic from "./Logic";
import Board from './Board';
import Info from './Info';

interface IGameState
{
  squares: logic.Square[][],
  nextShape: logic.Square[][],
  gameOver: boolean,
  lineCount: number
}

export default class Game extends Component<{}, IGameState>
{  
  private board: logic.Board;
  private timer: number = 0;
  private paused: boolean = true;

  constructor(props: any)
  {
    super(props);

    this.board = new logic.Board(10, 20);

    this.state = { 
      squares: this.board.squares,
      nextShape: this.board.getNextShape(),
      gameOver: false,
      lineCount: 0
    };
  }

  componentDidMount()
  {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount()
  {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  onTimerTick = () => this.moveDown();

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32) // space
    {
      while(this.board.moveShapeDown()){}

      if (!this.board.gameOver)
        this.board.clearCompleted();

      this.setState({ 
        squares: this.board.squares,
        nextShape: this.board.getNextShape(),
        gameOver: this.board.gameOver,
        lineCount: this.board.lineCount
      });
    }
    else if (event.keyCode === 37) // left
    {
      if (this.board.moveShapeLeft())
        this.setState({ squares: this.board.squares});
    }
    else if (event.keyCode === 39) // right
    {
      if (this.board.moveShapeRight())
        this.setState({ squares: this.board.squares});
    }
    else if (event.keyCode === 38) // up (rotate)
    {
      if (this.board.rotateShape())
        this.setState({ squares: this.board.squares});
    }
    else if (event.keyCode === 40) // down
    {
      this.moveDown();
    }
    else if (event.keyCode === 80) // p (pause)
    {
      this.togglePause();
    }
  }

  moveDown()
  {
    if (this.board.moveShapeDown())
    {
      this.setState({squares: this.board.squares});
    }
    else
    {
      if (this.board.clearCompleted())
        this.setState({ squares: this.board.squares});

      this.setState({
        nextShape: this.board.getNextShape(),
        gameOver: this.board.gameOver,
        lineCount: this.board.lineCount
      });
    }
  }

  stopTimer = () => window.clearInterval(this.timer);
  startTimer =() => {
    this.stopTimer();
    this.timer = window.setInterval(this.onTimerTick.bind(this), 500);
  };

  togglePause()
  {
    if (this.paused)
      this.startTimer();
    else
      this.stopTimer();

    this.paused = !this.paused;
  }

  newGame()
  {
    this.board = new logic.Board(10, 20);
    this.paused = false;

    this.setState({ 
      squares: this.board.squares,
      nextShape: this.board.getNextShape(),
      gameOver: false,
      lineCount: 0
    });

    this.startTimer();
  }

  getBoardWidth = () => this.board.m * 35;
  getBoardHeight = () => this.board.n * 35;
  getInfoWidth = () => 320;
  getGameWidth = () => this.getBoardWidth() + this.getInfoWidth() + 10;

  render()
  {
    return (
      <React.Fragment>
      <div className="game" style={{width: this.getGameWidth()}}>
        <Board squares={this.state.squares} style={{ width: this.getBoardWidth(), float: "left"}}></Board>
        <Info 
          nextShape={this.state.nextShape} 
          style={{ width: this.getInfoWidth(), float: "left"}} 
          isGameOver={this.state.gameOver}
          lineCount={this.state.lineCount}
          onPause={this.togglePause.bind(this)}
          onNewGame={this.newGame.bind(this)}></Info> 
        <div className="clear"></div>
      </div>
      </React.Fragment>
    );
  }
}