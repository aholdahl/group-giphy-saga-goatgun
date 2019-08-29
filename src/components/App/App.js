import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

import Search from '../Search/Search';
import Favorites from '../Favorites/Favorites';

class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to = "/favorites">Favorites</Link>
          </li>
        </ul>
        <h1>Giphy Search!</h1>
        <Search/>
      </div> 
      <Route path="/" Component={Search} />
      <Route path="/favorites" component={Favorites}/>
      </Router>
    );
  }
  
}

export default App;
