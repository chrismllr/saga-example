// @flow
import uniq from 'lodash.uniq';
import type {
  ShopResult,
  Action,
  CartState
} from './reducer';

// Constants
export const ADD_TO_CART = 'cart/ADD_TO_CART';
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
export const RESULTS_REQUESTED = 'cart/RESULTS_REQUESTED';
export const SET_RESULTS = 'cart/SET_RESULTS';

// Action Creators
function addToCart(item: ShopResult): Action {
  return {
    type: ADD_TO_CART,
    payload: item
  };
}

function removeFromCart(item: ShopResult): Action {
  return {
    type: REMOVE_FROM_CART,
    payload: item
  };
}

export function setResults(results: Array<ShopResult>): Action {
  return {
    type: SET_RESULTS,
    payload: results
  };
}

// Saga Request Action Creators
function fetchResults(): { type: string } {
  return {
    type: RESULTS_REQUESTED
  };
}

// Action Handlers
export const handlers = {
  [ADD_TO_CART] (state: CartState, action: Action) {
    return {
      ...state,
      cart: uniq([...state.cart, action.payload])
    };
  },

  [REMOVE_FROM_CART] (state: CartState, action: Action) {
    return {
      ...state,
      cart: state.cart.filter(
        item => item.id !== action.payload.id
      )
    };
  },

  [SET_RESULTS] (state: CartState, action: Action) {
    return {
      ...state,
      results: action.payload
    };
  }
};

export default {
  fetchResults,
  addToCart,
  removeFromCart
};
