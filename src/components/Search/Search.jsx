import React, { Component } from 'react';
// import {connect} from 'react-redux';

class Search extends Component{

state = {
    newSearch: '',
}

handleChange = (event) => {
    console.log('you are in the input', event.target.value);
    
    this.setState({
        newSearch: event.target.value
    })
}

handleSubmit = (event)=>{
    event.preventDefault();
console.log('you clicked the submit');
this.props.dispatch({
    type: 'FETCH_GIFS',
    payload: this.state.newSearch
})
this.setState({
    newSearch: '',
})
}

render(){

    return (
      <div>
        <h1>Hello from Search Component</h1>
        <form onSubmit={this.handleSubmit}>
        <input value={this.state.newSearch}  onChange={this.handleChange} type = "text" placeholder = "Enter your search here" />
        <button type="submit">Submit Your Search</button>
        </form>
        <ul>
            
        </ul>
      </div>
    );

}
}

export default Search;