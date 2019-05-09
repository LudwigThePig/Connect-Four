import React from 'react';

const Disc = (props) => {
  return (
    <div className="disc" 
      data-x={props.coords.x}  
      data-y={props.coords.y} 
      onMouseOver={props.handleHover} 
      onMouseOut={props.handleHover}
      onClick={props.dropPiece}
    >
    </div>
  )
}

export default Disc;