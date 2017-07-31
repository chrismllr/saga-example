// @flow
import { handlers } from './actions';

// Types
export type Result = {
  id: string,
  album: string,
  artist: string,
  price: number
};

export type Action =
  | {
    type: string,
    payload: Result
  }
  | {
    type: string,
    payload: Array<Result>
  };

export type CartState = {
  cart: Array<Result>,
  results: Array<Result>,
  isFetching: boolean
};

// Initial State
const initialState: CartState = {
  cart: [],
  results: [],
  isFetching: false
};

// Reducer
export default function cartReducer (state: CartState = initialState, action: Action) {
  const handler = handlers[action.type];

  if (handlers[action.type]) {
    return handler(state, action);
  }

  return state;
}
