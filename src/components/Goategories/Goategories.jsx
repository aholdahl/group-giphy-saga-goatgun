import React, { Component } from 'react';
import { connect } from "react-redux";

class Categories extends Component {
  state = {
    newCategory: '',
    editMode: false
  }

  componentDidMount() {
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

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.editMode) {
      this.props.dispatch({
        type: 'ADD_CATEGORY',
        payload: this.state.newCategory
      })
    } else {
      this.props.dispatch({
        type: 'EDIT_GOATEGORY',
        payload: this.state.newCategory
      })
    }
    this.setState({
      newCategory: '',
      editMode: false
    })
  }

  handleChange = (event) => {
    this.setState({
      newCategory: event.target.value,
      editMode: this.state.editMode
    })
  }

  handleEdit = (name) => {
    this.setState({
      newCategory: name,
      editMode: !this.state.editMode
    })
  }

  exitEdit = () => {
    this.setState({
      newCategory: '',
      editMode: false
    })
  }

  render() {
    return (
      <div>
        <h1>List of Categories</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder='Name' value={this.state.newCategory}></input>
          <button>{this.state.editMode ? 'Edit Category': 'Add Category'}</button>
          {this.state.editMode && (<button onClick={this.exitEdit}>Exit Edit</button>)}
        </form>
        <ul>
          {this.props.reduxStore.categoryReducer.map(cat =>
            <li key={cat.id}>
              {cat.name} <span> </span> <button onClick={() => this.handleClick(cat.id)}>Delete</button>
              <button onClick={()=>this.handleEdit(cat.name)}>Edit</button>
            </li>
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