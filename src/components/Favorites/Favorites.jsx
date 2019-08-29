import React, {Component} from 'react';
import './Favorites.css';
import FavortiesList from '../FavoritesList/FavoritesList'

class Favorites extends Component {
    render() {
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
            <FavortiesList />
        </div>
        )
    }
}

export default Favorites;