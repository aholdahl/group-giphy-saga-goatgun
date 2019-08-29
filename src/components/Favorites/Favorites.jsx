import React, {Component} from 'react';
import './Favorites.css';
import FavoritesItem from '../FavoritesItem/FavoritesItem'
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
        id: 1,
        url: `https://www.pexels.com/photo/nature-red-love-romantic-67636/`,
        category: 'goat'
    }

    render() {
        
        let htmlToDom = this.props.reduxStore.favoritesReducer.map((hearted) => {
            return (<tr key={hearted.id}>
                <td><img src={hearted.url}/></td>
                <td>Favorited</td>
                <td><input placeholder="category" value={hearted.category} />
                    <Button color="primary" className={classes.button}>Add</Button></td>
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
            <FavoritesItem />
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