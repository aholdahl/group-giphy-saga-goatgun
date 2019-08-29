import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


makeStyles(theme => ({
    button: {
        margin: theme.spaceing(1)
    },
    input: {
        display: 'none',
    }
}))

const classes = makeStyles();


class FavoritesList extends Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Giphy</th>
                            <th>Favorited</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Image tag needed</td>
                            <button>Hearted</button>
                            <input placeholder="category" />
                            <Button color="primary" className={classes.button}>Add</Button>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FavoritesList;