import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createReducer from './state/createReducer';
import { saga as cartSaga } from './state/cart';

import './index.css';

export const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  createReducer(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(cartSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
