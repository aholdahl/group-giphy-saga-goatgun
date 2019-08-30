import React, { Component } from 'react';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Search extends Component{

state = {
    newSearch: '',
    limit: 50
}

handleChange = (event) => {
    console.log('you are in the input', event.target.value);
    
    this.setState({
      ...this.state,
        newSearch: event.target.value,
    })
}

handleSubmit = (event)=>{
    event.preventDefault();
console.log('you clicked the submit');
this.props.dispatch({
    type: 'GET_SEARCH',
    payload: this.state
})
this.setState({
    newSearch: '',
})
}

handleFavorite = (url) => {
    console.log('you clicked love it!');
    this.props.dispatch({
        type: 'ADD_FAVORITE',
        payload: url
    })
}


render(){
    return (
      <div>
        <h1>Hello from Search Component</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.newSearch}
            onChange={this.handleChange}
            type="text"
            placeholder="Enter your search here"
          />
          <button type="submit">Submit Your Search</button>
        </form>
        <h1>Enjoy your GIFS below</h1>
        <Paper>
          <Table id="searchTable">
            <TableHead>
              <TableRow>
                <TableCell>Giphy</TableCell>
                <TableCell>Add to Favorites</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          {this.props.reduxStore.searchList !== '' &&
            this.props.reduxStore.searchList.data.map(gif => {
              return (
                <TableRow key={gif.id}>
                  {" "}
                  <TableCell><img src={gif.images.downsized_medium.url} alt="gif" />{" "}</TableCell>
                  <TableCell><button onClick={() => this.handleFavorite(gif.images.downsized_medium.url)}>I LOVE IT</button></TableCell>
                </TableRow>
              );
            })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );

}
}

const mapStoreToProps = reduxStore => {
    return {
        reduxStore
    }
}

export default connect(mapStoreToProps)(Search);