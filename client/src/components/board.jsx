import React from 'react';
import Disc from './disc.jsx';

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 'red',
      discs: Array.apply(null, Array(42)).map( (x, i) =>  undefined) 
    }
    this.indexToCoord = this.indexToCoord.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.dropPiece = this.dropPiece.bind(this);
  }

  indexToCoord(index) {
    const x = index % 7;
    const y = Math.floor(index / 7);
    return {x: x, y: y}
  }
  coordsToIndex(x, y) {
    return Number(y) * 7 + Number(x);
  }
  // handleHover = (e) => {
  //   console.log(e);
  // }

  // dropPiece = (e) => {
  //   console.log(e);
  // }

  checkForWin() {
    const board = this.state.discs;
    let count = 1;

    //Winning Conditions
    const horizontal = (disc, i) => {
      if (board[i+1] === disc) {
        count++;
        if (count === 4) {
          console.log('horiz')
          return true;
        }
        return horizontal(disc, i + 1)
      } else {
        count = 1;
        return; 
      }
    }
    const vertical = (disc, i) => {
      if (board[i+7]=== disc) {
        count++;
        if (count >= 4) {
          console.log('vert')
          return true;
        }
        return vertical(disc, i+7)
      } else {
        count = 1;
        return; 
      }
    }
    const major = (disc, i) => {
      let coords = this.indexToCoord(i); //{x: x, y: y}
      if (coords.x > 0) {
        if (board[i+8]=== disc) {
          count++;
          if (count >= 4) {
            console.log('major')
            return true;
          }
          return major(disc, i+8)
        } else {
          count = 1;
          return; 
        }
      }
    }
    const minor = (disc, i) => {
      let coords = this.indexToCoord(i); //{x: x, y: y}
      if (coords.x < 6) {
        if (board[i+6]=== disc) {
          count++;
          if (count >= 4) {
            console.log('minor')
            return true;
          }
          return minor(disc, i+6)
        } else {
          count = 1;
          return; 
        }
      }
    }


    //Checking for with each condition
    board.forEach((disc, index) => {
      if (disc !== undefined) {
        let res = [horizontal(disc, index), vertical(disc, index), major(disc, index), minor(disc, index)].some(test => test===true);
        if (res){
          console.log('Winner Winner, chicken dinner!', disc)
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

  render() {
    return (
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
    )
  } 
}

export default Board;