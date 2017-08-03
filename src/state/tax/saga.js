// @flow
import { takeLatest, all, fork, call, put, select, cancel } from 'redux-saga/effects';
import { calculate } from '../../services/tax';
import type { CartState, ShopResult } from '../cart/reducer';

import {
  setTaxes,
  fetch
} from './actions';

// Utils
function delay (ms: number): Promise<*> {
  return new Promise((res: Function) => {
    setTimeout(res, ms);
  });
}

function combineAmount (items: Array<ShopResult>): number {
  return items.reduce((acc: number, cur: ShopResult) => {
    return acc + cur.price;
  }, 0);
}

// Selectors
const getCart = ({ cart: { cart } }: { cart: CartState }) => ({
  cart
});

// Workers
function* calculateTax(): Generator<*, *, *> {
  const { cart } = yield select(getCart);

  yield put(fetch(true));

  if (!cart.length) {
    yield put(setTaxes(0));
    yield put(fetch(false));
    yield cancel();
  }

  const taxableAmount = combineAmount(cart);
  const { data } = yield call(calculate, taxableAmount);

  yield call(delay, 1200);
  yield put(setTaxes(data));
  yield put(fetch(false));
}

// Sagas
function* watchCalculateTax(): Generator<*, *, *> {
  yield takeLatest(['cart/ADD_TO_CART', 'cart/REMOVE_FROM_CART'], calculateTax);
}

export default function* cartSaga(): Generator<*, *, *> {
  yield all([
    fork(watchCalculateTax)
  ]);
}
