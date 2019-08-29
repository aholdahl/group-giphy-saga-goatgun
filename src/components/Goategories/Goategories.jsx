import React, { Component } from 'react';
import { connect } from "react-redux";

class Categories extends Component {
  state = {  }

  componentDidMount(){
    this.props.dispatch({
      type: 'FETCH_CATEGORIES'
    })
  }

  handleClick = (id) => {
    this.props.dispatch({
      type: 'REMOVE_CATEGORY',
      payload: id,
    })
  }

  render() { 
    return ( 
      <div>
        <h1>List of Categories</h1>
        <form>
          <input></input> 
          <button>Add Category</button>
        </form>
        <ul>
          {this.props.reduxStore.categoryReducer.map(cat => 
          <li key={cat.id}>{cat.name} <span> </span> <button onClick={()=>this.handleClick(cat.id)}>Delete</button></li>
          )}
        </ul>
      </div>
     );
  }
}

const mapStoreToProps = (reduxStore) => {
  return {
    reduxStore,
  }
}
 
export default connect(mapStoreToProps)(Categories);