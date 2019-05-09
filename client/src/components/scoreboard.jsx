import React from 'react';

const ScoreBoard = (props) => {
  return(
    <div id="scoreboard">
      <h1>CONNECT FOUR</h1>
      <h2>CURRENT PLAYER: <span className={`${props.currentPlayer}-text cur-player`}>{props.currentPlayer.toUpperCase()}</span></h2>
    </div>
  )
}

export default ScoreBoard;