import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import createReducer from './state/createReducer';
import { saga as cartSaga } from './state/cart';
import { saga as taxSaga } from './state/tax';

import './index.css';

export const sagaMiddleware = createSagaMiddleware();

// Build store with tax/ cart reducers
// add saga middleware
const store = createStore(
  createReducer(),
  applyMiddleware(sagaMiddleware)
);

// Run our sagas
sagaMiddleware.run(cartSaga);
sagaMiddleware.run(taxSaga);

// Go!
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// Register service worker in prod env
registerServiceWorker();
