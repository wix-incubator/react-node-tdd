import React, {Component} from 'react';

class Game extends Component {
  render() {
    return (
      <table>
        <tbody>
          {new Array(10).fill(undefined).map((row, x) =>
            <tr key={x} data-hook="row">
              {new Array(10).fill(undefined).map((cell, y) => <td key={y} data-hook="cell"/>)}
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Game;
