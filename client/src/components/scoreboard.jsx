import React from 'react';

const ScoreBoard = (props) => {
  console.log(props.currentPlayer);
  let curName = props.players[0].name;
  if (props.currentPlayer === "red") {
    curName = props.players[1].name;
  }
  // let curName = props.currentPlayer === 'red' ? props.players[0].name : props.players[1].name;
  return(
    <div id="scoreboard">
      <h1>CONNECT FOUR</h1>
      <h2>CURRENT PLAYER: <span className={`${props.currentPlayer}-text cur-player`}>{curName}</span></h2>
    </div>
  )
}

export default ScoreBoard;