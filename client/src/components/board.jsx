import React from 'react';
import Disc from './disc.jsx';
import ScoreBoard from './scoreboard.jsx';
import GameOver from './gameOver.jsx';



class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      player1: {
        name: 'red',
        color: 'red',
        wins: 0
      },
      player2: {
        name: 'blue',
        color: 'blue',
        wins: 0
      },
      currentPlayer: 'red',
      discs: Array.apply(null, Array(42)).map( (x) =>  undefined) 
    }
    this.indexToCoord = this.indexToCoord.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.dropPiece = this.dropPiece.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  indexToCoord(index) {
    const x = index % 7;
    const y = Math.floor(index / 7);
    return {x: x, y: y}
  }
  coordsToIndex(x, y) {
    return Number(y) * 7 + Number(x);
  }

  checkForWin() {
    const board = this.state.discs;
    let count = 1;

    //Recursively search ahead for a win
    const recurse = (disc, idx, inc) => {
      if (board[idx + inc] === disc) {
        count++;
        if (count === 4) {
          count = 1;
          console.log('win?')
          return true;
        }
        return recurse(disc, idx + inc, inc)
      } else {
        count = 1;
        return; 
      }
    }

    //Check each node
    board.forEach((disc, index) => {
      //if there is a disc, test for win in each direction
      if (disc !== undefined) {
        // [Horizontal win, vertical win, major diagonal win, minor diagonal win]
        let res = [recurse(disc, index, 1), recurse(disc, index, 6), recurse(disc, index, 7), recurse(disc, index, 8)];
        if (res.some(res => res === true)){
          console.log(this.state.discs)
          this.setState({
            gameOver: true
          });
        }
      }
    });
  }

  handleHover(e) {
    const xCoord = e.target.dataset.x;
    let cols = [...document.getElementsByClassName('disc')].filter(disc => disc.dataset.x === xCoord)
    return e.type === 'mouseover' ? this.handleMouseOver(cols) : this.handleMouseOut(cols);
  }

  handleMouseOver(list) {
    return [...list].forEach(el => el.classList.add('hovered'));
  }
  
  handleMouseOut(list) {
    return [...list].forEach(el => el.classList.remove('hovered'));
  }


  dropPiece(e) {
    const x = e.target.dataset.x;
    let y = 5;
    let index;
    let newDiscs = [...this.state.discs];
    while (y  > -1) {
      index = this.coordsToIndex(x, y)
      if (this.state.discs[index] === undefined) {
        newDiscs[index] = this.state.currentPlayer;
        break;
      } else {
        y--;
      }
    }
    this.setState({
      currentPlayer: this.state.currentPlayer === 'red' ? 'blue' : 'red',
      discs: newDiscs
    }, (_=>this.checkForWin()))
  }
  newGame(e) {
    e.preventDefault();
    this.setState({
      gameOver: false,
      discs: [...this.state.discs].map(i => undefined)
    });
    this.props.results.post();
  }

  render() {
    return (
      <div>
        <ScoreBoard currentPlayer={this.state.currentPlayer} />

        {this.state.gameOver ? 
          <GameOver 
            winner={this.state.currentPlayer === 'red' ? this.state.player1 : this.state.player2} 
            color={this.state.currentColor}
            newGame={this.newGame}
            />
          : null}

        <div id="board">
          {this.state.discs.map( (disc, index) => 
            <Disc
            player={disc}
            coords={this.indexToCoord(index)} 
            handleHover={this.handleHover}
            dropPiece={this.dropPiece}
            key={`disc${index}`}
            />
            )}
        </div>

      </div>
    )
  } 
}

export default Board;