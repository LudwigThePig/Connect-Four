import React from 'react';

const Disc = (props) => {
  return (
    <div className="disc" data-x={props.coords.x}  data-y={props.coords.y} data-coord>
    </div>
  )
}

export default Disc;