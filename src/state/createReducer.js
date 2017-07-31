import { combineReducers } from 'redux';
import cart from './cart/reducer';

export default function createReducer () {
  return combineReducers({
    cart
  });
}
