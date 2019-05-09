import React from 'react';

const gameOver = (props) => {
  return(
    <div id="gameOver">
      <h1>{props.winner.name.toUpperCase()} WON!</h1>
      <button onClick={props.newGame}>Play Again?</button>
    </div>
  )
}

export default gameOver;