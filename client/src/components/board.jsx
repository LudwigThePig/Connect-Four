import React from 'react';
import Disc from './disc.jsx';

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      discs: Array.apply(null, Array(42)).map( (x, i) =>  i) 
    }
    this.indexToCoord = this.indexToCoord.bind(this);
  }
  indexToCoord(index) {
    const x = Math.floor(index / 7); 
    const y = index % 7;
    return {x: x, y: y}
  }
  render() {
    console.log(this.state.discs)
    return (
      <div id="board">
        {this.state.discs.map( (disc, index) => 
          <Disc coords={this.indexToCoord(index)} />
        )}
      </div>
    )
  } 
}

export default Board;