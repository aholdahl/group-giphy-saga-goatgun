import React, { Component } from 'react';
import Favorites from '../Favorites/Favorites'


class App extends Component {

  render() {
    return (
      <div>
        <h1>Giphy Search!</h1>
        <Favorites />
      </div>
    );
  }
  
}

export default App;
