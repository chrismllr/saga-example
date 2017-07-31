// @flow
import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import { get } from '../../services/search-results';

import {
  RESULTS_REQUESTED,
  setResults
} from './actions';

// Utils
function delay (ms: number): Promise<*> {
  return new Promise((res: Function) => {
    setTimeout(res, ms);
  });
}

// Workers
function* fetchResults(): Generator<*, *, *> {
  const { data } = yield call(get);
  yield call(delay, 1000);

  yield put(setResults(data));
}

// Sagas
function* watchFetchResults(): Generator<*, *, *> {
  yield takeEvery(RESULTS_REQUESTED, fetchResults);
}

export default function* cartSaga(): Generator<*, *, *> {
  yield all([
    fork(watchFetchResults)
  ]);
}
