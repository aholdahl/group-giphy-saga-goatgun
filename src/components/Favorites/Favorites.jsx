import React, {Component} from 'react';
import './Favorites.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: 'none',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    }
}));

function createData(url, current, change) {
    return {url, current, change}
}


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
        let categoryList = this.props.reduxStore.categoryReducer.map((list) => {
           return <option key={list.id} value={list.id}>{list.name}</option>
        })
        const rows = this.props.reduxStore.favoritesReducer
        return (
        <div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Giphy</TableCell>
                            <TableCell>Current Category</TableCell>
                            <TableCell>Change Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((hearted) => {
                            return(
                            <TableRow key={hearted.id}>
                            <TableCell component="th" scope="row"> <img src={hearted.url}/> </TableCell>
                            <TableCell> {hearted.category} </TableCell>
                            <TableCell> <select onChange={this.handleChange}> {categoryList} </select> 
                            <Button color="primary" className={classes.button} onClick={()=>this.handleClick(hearted.id)}>Add</Button></TableCell>
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
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
