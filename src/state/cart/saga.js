import { takeEvery, all, fork, call, put } from 'redux-saga/effects';
import { get } from '../../services/search-results';

import {
  RESULTS_REQUESTED,
  setResults
} from './actions';

// Utils
const delay = ms => new Promise(res => setTimeout(res, ms));

// Workers
function* fetchResults () {
  const { data } = yield call(get);
  yield call(delay, 1000);

  yield put(setResults(data));
}

// Sagas
function* watchFetchResults () {
  yield takeEvery(RESULTS_REQUESTED, fetchResults);
}

export default function* cartSaga () {
  yield all([
    fork(watchFetchResults)
  ]);
}
