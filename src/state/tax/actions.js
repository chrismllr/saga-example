// @flow
import type {
  Action,
  TaxState
} from './reducer';

// Constants
export const IS_FETCHING = 'tax/IS_FETCHING';
export const SET_TAXES = 'tax/SET_TAXES';

// Action Creators
export function fetch(isFetching: boolean): Action {
  return {
    type: IS_FETCHING,
    payload: isFetching
  };
}

export function setTaxes(tax: number): Action {
  return {
    type: SET_TAXES,
    payload: tax
  };
}

// Action Handlers
export const handlers = {
  [SET_TAXES] (state: TaxState, action: Action) {
    return {
      ...state,
      taxAmount: action.payload
    };
  },

  [IS_FETCHING] (state: TaxState, action: Action) {
    return {
      ...state,
      isFetching: action.payload
    };
  }
};

export default {};
