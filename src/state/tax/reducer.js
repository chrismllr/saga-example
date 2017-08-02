// @flow
import { handlers } from './actions';

// Types
export type Action =
  | { type: 'tax/SET_TAXES', payload: number }
  | { type: 'tax/IS_FETCHING', payload: boolean };

export type TaxState = {
  +taxAmount: number,
  +isFetching: boolean
};

// Initial State
const initialState: TaxState = {
  taxAmount: 0,
  isFetching: false
};

// Reducer
export default function cartReducer(state: TaxState = initialState, action: Action) {
  const handler = handlers[action.type];

  if (handlers[action.type]) {
    return handler(state, action);
  }

  return state;
}
