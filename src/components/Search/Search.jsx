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

}

render(){

    return (
      <div>
        <h1>Hello from Search Component</h1>
        <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type = "text" placeholder = "Enter your search here" />
        <button type="submit">Submit Your Search</button>
        </form>
      </div>
    );

}
}

export default Search;