import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {merge} from 'lodash';
import Board from '../Board';
import boardService from '../../boardService';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', board: {}};
  }

  async componentDidMount() {
    const {match} = this.props;
    if (match && match.params.gameName) {
      const resp = await axios.get(`/api/game/${match.params.gameName}`);
      this.setState(resp.data);
    } else {
      const board = boardService.getRandomMines();
      this.setState({board});
    }
  }

  handleGameNameChange = event => {
    this.setState({name: event.target.value});
  }

  handleSubmit = event => {
    axios.post('/api/game', this.state);
    event.preventDefault();
  }

  handleCellClick = key => {
    const board = merge(this.state.board, {[JSON.stringify(key)]: {revealed: true}});
    this.setState({board});
  }

  render() {
    return (
      <div>
        <form>
          <input data-hook="game-name-input" type="text" value={this.state.name} onChange={this.handleGameNameChange}/>
          <input data-hook="game-save" type="button" value="Submit" onClick={this.handleSubmit}/>
        </form>
        <Board onCellClick={this.handleCellClick} data={this.state.board}/>
      </div>
    );
  }

  static propTypes = {
    match: PropTypes.object
  }
}

export default Game;
