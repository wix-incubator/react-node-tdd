import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import s from './App.scss';

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
      <div className={s.root}>
        <div className={s.header}>
          <h2>{'Hello World!'}</h2>
        </div>
        <p className={s.intro}>
          {'Get started here: https://github.com/wix/yoshi'}
        </p>
        <Link to="/game" data-hook="new-game">New game</Link>
        <ul>
          {this.state.games.map((el, idx) => <li data-hook="game" key={idx}>{el.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
