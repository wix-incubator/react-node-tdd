import 'babel-polyfill';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Game from './components/Game';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route path="/game/:gameName?" component={Game}/>
    </div>
  </Router>,
  document.getElementById('root')
);
