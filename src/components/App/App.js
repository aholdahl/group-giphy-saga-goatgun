import React, { Component } from 'react';
import Favorites from '../Favorites/Favorites'
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Search from '../Search/Search';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'typeface-roboto';
import { AppBar } from '@material-ui/core';
import './App.css';
import Categories from '../Goategories/Goategories';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695c',
    },
    secondary: {
      main: '#ffd740',
    }
  }
})

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <AppBar position="static" color="primary">
            <h1>Giphy Goat Saga!</h1>
            <nav className="navBar">
              <ul>
                <li>
                  <Link to="/">Search</Link>
                </li>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
              </ul>
            </nav>
          </AppBar>
          <Route exact path="/" component={Search} />
          <Route path="/favorites" component={Favorites}/>
          <Route path="/categories" component={Categories} />
        </Router>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
