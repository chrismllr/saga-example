// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { compose, withHandlers } from 'recompose';
import withLifecycle from '@hocs/with-lifecycle';

import { actions } from '../../state/cart';
import { actions as taxActions } from '../../state/tax';

import type { ShopResult, CartState } from '../../state/cart/reducer';
import type { TaxState } from '../../state/tax/reducer';

import { currency } from '../../helpers/format';
import './style.css';

type AppProps = {
  cartState: CartState,
  cartActions: {
    fetchResults: Function,
    addToCart: Function,
    removeFromCart: Function
  },
  taxState: TaxState,
  taxActions: {
    calculateTaxes: Function
  },
  onItemAdded: Function,
  onItemRemoved: Function,
  derived: {
    total: number
  }
};

function App({
  cartState: { results, cart },
  taxState: { taxAmount, isFetching },
  derived: { total },
  onItemAdded,
  onItemRemoved
}: AppProps) {
  return (
    <div className="App">
      <div className="App__header">
        <div className="container">
          <h2 className="App__title">Record Store</h2>
          <p className="clr-red">
            Select an album below to add it to your cart.
          </p>
        </div>
      </div>

      <div className="App__body container">
        <div className="App__body__col pr-large">
          <ul className="Results__list">
            {results.map((rs, i) => (
              <li key={i} className="Result">
                <div>
                  <p className="Result__album">{rs.album}</p>
                  <p className="Result__artist">{rs.artist}</p>
                </div>
                <div className="ta-right">
                  <p className="Result__price">{currency(rs.price)}</p>
                  <button onClick={onItemAdded(rs)}>
                    (+) Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="App__body__col Order">
          <h4 className="Order__header">My Cart</h4>

          <ul className="Order__list">
            {!cart.length &&
              <h5 className="ta-center clr-gray lsp-small fw-medium">
                You don't have anything in your cart!
              </h5>}

            {cart.map((rs, i) => (
              <li key={i} className="OrderResult">
                <div>
                  <p className="OrderResult__album">{rs.album}</p>
                  <p className="OrderResult__artist">{rs.artist}</p>
                </div>
                <div className="ta-right">
                  <p className="OrderResult__price">{currency(rs.price)}</p>
                  <button onClick={onItemRemoved(rs)}>
                    (-) Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="Order__summary">
            <p className="ta-right">
              {isFetching
                ? <span className="clr-red ts-ital">Calculating Taxes...</span>
                : `Taxes: ${currency(taxAmount)}`}
            </p>
            <p className="ta-right">
              Total: {currency(total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const totalSelector = createSelector(
  (state: { cart: CartState }) => state.cart,
  (state: { tax: TaxState }) => state.tax,
  ({ cart }, { taxAmount }) => cart.reduce(
    (a: number, c: ShopResult) => a + c.price,
    0
  ) + taxAmount
);

function mapStateToProps(
  state: {
    cart: CartState,
    tax: TaxState
  }
) {
  return {
    cartState: state.cart,
    taxState: state.tax,
    derived: {
      total: totalSelector(state)
    }
  };
}

function mapActionCreators(dispatch: Function) {
  return {
    cartActions: bindActionCreators(actions, dispatch),
    taxActions: bindActionCreators(taxActions, dispatch)
  };
}

function itemIsInCart (item: ShopResult, cart: Array<ShopResult>) {
  return cart.some((rs: ShopResult) => rs.id === item.id);
}

export default compose(
  connect(mapStateToProps, mapActionCreators),
  withHandlers({
    onItemAdded: ({
      cartActions: { addToCart },
      cartState: { cart }
    }: AppProps) => (rs: ShopResult) => () => {
      if (!itemIsInCart(rs, cart)) addToCart(rs);
    },
    onItemRemoved: ({
      cartActions: { removeFromCart }
    }: AppProps) => (rs: ShopResult) => () => {
      removeFromCart(rs);
    }
  }),
  withLifecycle({
    onDidMount({ cartActions: { fetchResults } }: AppProps) {
      fetchResults();
    }
  })
)(App);
