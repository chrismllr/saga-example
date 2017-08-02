import { combineReducers } from 'redux';
import { reducer as cart } from './cart';
import { reducer as tax } from './tax';

export default function createReducer () {
  return combineReducers({
    cart,
    tax
  });
}
