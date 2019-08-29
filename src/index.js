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
}

function* updateCategory(action) {
  try{
    let response = yield axios.put(`/api/favorite/${action.payload.favoriteId}`, action.payload.category_id);
    yield put ({
      type: 'SET_FAVORITES',
      payload: response.data
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
    let searchResponse = yield axios.get('/goat/search');
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


//Reducers

const searchList = (state = [], action) => {
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
    categoryReducer
  }),
  applyMiddleware(sagaMiddleWare, logger)
)

sagaMiddleWare.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
