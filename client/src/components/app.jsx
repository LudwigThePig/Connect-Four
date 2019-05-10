import React from 'react';
import GameBoard from './board.jsx';
import StartMenu from './startMenu.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      red: 'red',
      blue: 'blue',
      startMenu: true
    }
    this.getResults = this.getResults.bind(this);
    this.postResults = this.postResults.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('click')
    this.setState({
      startMenu: false
    });
  }

  render() {
    if (this.state.startMenu) {
      return (
        <div>
          <StartMenu 
            handleChange={this.handleChange} 
            formVals={[this.state.red, this.state.blue]} 
            handleSubmit={this.handleSubmit}
          />
        </div>
      )
    }
    return(
      <div>
        <GameBoard 
          results={{get: this.getResults, post: this.postResults}}
          players={{red: this.state.red, blue: this.state.blue}}
        />
      </div>
    )
  }
}

export default App;