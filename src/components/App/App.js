import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {games: []};
  }
  async componentDidMount() {
    const resp = await axios.get('/api/games');
    this.setState({games: resp.data});
  }

  render() {
    return (
      <div className="root">
        <Link to="/game" data-hook="new-game">New game</Link>
        <ul>
          {this.state.games.map((el, idx) => <li data-hook="game" key={idx}><Link to={`/game/${el.name}`} data-hook="new-game">{el.name}</Link></li>)}
        </ul>
      </div>
    );
  }
}

export default App;
