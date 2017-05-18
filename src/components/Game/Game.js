import React, {Component} from 'react';
import axios from 'axios';

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
              <tr key={x} data-hook="row">
                {new Array(10).fill(undefined).map((cell, y) => <td key={y} data-hook="cell"/>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Game;
