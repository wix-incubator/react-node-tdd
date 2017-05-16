import React from 'react';
import {Link} from 'react-router-dom';
import s from './App.scss';

function App() {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <h2>{'Hello World!'}</h2>
      </div>
      <p className={s.intro}>
        {'Get started here: https://github.com/wix/yoshi'}
      </p>
      <Link to="/game" data-hook="new-game">New game</Link>
    </div>
  );
}

export default App;
