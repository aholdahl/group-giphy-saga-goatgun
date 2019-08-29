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
  yield takeEvery('GET_SEARCH', searchGiphy);
  yield takeEvery('ADD_FAVORITE', addFavorite);
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

function* addFavorite(action) {
  try {
    axios.post('/api/favorite', action.payload);
    yield put({
      type: 'SET_FAVORITES'
    })
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


const store = createStore(
  combineReducers({
    searchList,
  }),
  applyMiddleware(sagaMiddleWare, logger)
)

sagaMiddleWare.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
