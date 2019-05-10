import React from 'react';
import GameBoard from './board.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.getResults = this.getResults.bind(this);
    this.postResults = this.postResults.bind(this);
  }
  postResults(board, winner) {
    const body = {
      "board": board,
      "winner": winner
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch('/results', options)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  getResults() {
    return fetch('/results')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }
  render() {
    return(
      <div>
        <GameBoard results={ {get: this.getResults, post: this.postResults}} />
      </div>
    )
  }
}

export default App;