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
    const piece = e.target;
    const index = this.coordsToIndex(piece.dataset.x, piece.dataset.y);
    let newDiscs = [...this.state.discs];
    newDiscs[index] = this.state.currentPlayer;
    this.setState({
      discs: newDiscs
    });

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