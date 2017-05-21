import React, {Component} from 'react';
import axios from 'axios';
import './Game.scss';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', board: {}};
  }

  handleGameNameChange = event => {
    this.setState({name: event.target.value});
  }

  handleSubmit = event => {
    axios.post('/api/game', this.state);
    event.preventDefault();
  }

  handleCellClick = key => this.setState({board: {[JSON.stringify(key)]: {revealed: true}}})

  render() {
    return (
      <div>
        <form>
          <input data-hook="game-name-input" type="text" onChange={this.handleGameNameChange}/>
          <input data-hook="game-save" type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
        <table>
          <tbody>
            {new Array(10).fill(undefined).map((row, x) =>
              <tr className="row" key={x} data-hook="row">
                {new Array(10).fill(undefined).map((cell, y) => <td onClick={() => this.handleCellClick({x, y})} key={y} data-hook="cell"/>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Game;
