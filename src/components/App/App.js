import React, { Component } from 'react';
import Favorites from '../Favorites/Favorites'
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Search from '../Search/Search';


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
      </div>
      <Route exact path="/" component={Search} />
      <Route path="/favorites" component={Favorites}/>
      </Router>
    );
  }
  
}

export default App;
