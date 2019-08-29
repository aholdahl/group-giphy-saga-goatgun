import React, {Component} from 'react';
import './Favorites.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

makeStyles(theme => ({
    button: {
        margin: theme.spaceing(1)
    },
    input: {
        display: 'none',
    }
}))

const classes = makeStyles();

class Favorites extends Component {

    state = {
        category_id: 0,
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_FAVORITES'
        })
        this.props.dispatch({
            type: 'FETCH_CATEGORIES'
        })
    }

    handleClick = (id) => {
        console.log('clicked')
        this.props.dispatch({
            type: 'UPDATE_CATEGORY',
            payload: {category_id: this.state.category_id, favoriteId: id}
        })
    }//end handleClick

    handleChange = (event) => {
        // let categoryId = 
        this.setState({
            category_id: Number(event.target.value)
        })
    }//end handleChange




    render() {
        console.log(this.state);
        let htmlToDom = this.props.reduxStore.favoritesReducer.map((hearted) => {
            let categoryList = this.props.reduxStore.categoryReducer.map((list) => {
                return <option key={list.id} value={list.id}>{list.name}</option>
            })
            return (<tr key={hearted.id}>
                <td><img src={hearted.url}/></td>
                <td>Favorited</td>
                <td><select onChange={this.handleChange}>{categoryList}</select>
                    <Button color="primary" className={classes.button} onClick={()=>this.handleClick(hearted.id)}>Add</Button></td>
            </tr>)

        
        })

        return (
        <div>
            <header className="header">
                <div className="search">
                    <h3>Search</h3>
                </div>
                <div className="saga">
                    <h1>Giphy Saga</h1>
                </div>
                <div className="favorites">
                    <h3>FAVORITES</h3>
                </div>
            </header>
                {/* <pre>{JSON.stringify(this.props.reduxStore.favoritesReducer)}</pre> */}
                <table>
                    <thead>
                        <tr>
                            <th>Giphy</th>
                            <th>Favorited</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {htmlToDom}
                    </tbody>
                </table>
        </div>
        )
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        reduxStore
    }
}


export default connect(mapStateToProps)(Favorites);
