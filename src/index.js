import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from "axios";

//Sagas
const sagaMiddleWare = createSagaMiddleWare();

function* watcherSaga(){
  yield takeEvery('GET_SEARCH', searchGiphy)
  yield takeEvery('FETCH_FAVORITES', fetchFavorites)
  yield takeEvery('FETCH_CATEGORIES', fetchCategories)
  yield takeEvery('UPDATE_CATEGORY', updateCategory)
  yield takeEvery('ADD_FAVORITE', addFavorite);
  yield takeEvery('REMOVE_FAVORITE', removeFavorite);
  yield takeEvery('REMOVE_CATEGORY', removeCategory);
}

function* removeCategory(action) {
  try {
    yield axios.delete(`/api/category/${action.payload}`);
    yield put({
      type: 'FETCH_CATEGORIES'
    })
  } catch(error){
    console.log('error in DELETE category', error);
  }
}

function* removeFavorite(action) {
  try {
    yield axios.delete(`/api/favorite/${action.payload}`);
    yield put({
      type: 'FETCH_FAVORITES'
    })
  } catch (error) {
    console.log('error in DELETE favorite', error);
  }
}

function* updateCategory(action) {
  try{
    yield axios.put(`/api/favorite/${action.payload.favoriteId}`, {id:action.payload.category_id});
    yield put ({
      type: 'FETCH_FAVORITES',
    })
  } catch (error){
    console.log('error on get favorites', error)
  }
}//end updateCategory

function* fetchCategories(action) {
  try {
    let response = yield axios.get('/api/category')
    yield put ({
      type: 'SET_CATEGORIES',
      payload: response.data
    })
  }catch (error) {
    console.log('error on get categories', error)
  }
}

function* searchGiphy(action){
  try {
    let searchQuery = action.payload
    let searchResponse = yield axios.get(`/api/search/${searchQuery}`);
    console.log('response from API', searchResponse.data);
    yield put({
      type: 'SET_SEARCH',
      payload: searchResponse.data
    })
  } catch (error){
    console.log('error in GET search', error);
    
  }
}

function* fetchFavorites(action) {
  try {
    let response = yield axios.get('/api/favorite')
    yield put ({
      type: 'SET_FAVORITES',
      payload: response.data
    })
  } catch (error) {
    console.log('error in fetch favorites', error);
  }
}

function* addFavorite(action) {
  try {
    yield axios.post('/api/favorite',{ url: action.payload});
  } catch(error) {
    console.log('error in add favorite', error);
  }
}

//Reducers

const searchList = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload;
    default:
      return state;
  }
}

const favoritesReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_FAVORITES' :
      return action.payload;
    default: 
      return state;
  }
}

const categoryReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_CATEGORIES' :
      return action.payload
    default: 
    return state;
  }
}



const store = createStore(
  combineReducers({
    favoritesReducer,
    categoryReducer,
    searchList,
  }),
  applyMiddleware(sagaMiddleWare, logger)
)

sagaMiddleWare.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
