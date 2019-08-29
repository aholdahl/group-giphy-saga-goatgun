import React, { Component } from 'react';
import {connect} from 'react-redux';

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
    type: 'GET_SEARCH',
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
        <h1>Enjoy your GIFS below</h1>
        <ul>
            {JSON.stringify(this.props.reduxStore.searchList)}
            {this.props.reduxStore.searchList.map((gif) => {
                return (
                    <li> <img src={gif.data.images.downsized.url} alt= "gif" /> <button>I LOVE IT</button></li>
                )
            })}
        </ul>
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