// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../state/cart';
import { actions as taxActions } from '../../state/tax';

import type { ShopResult, CartState } from '../../state/cart/reducer';
import type { TaxState } from '../../state/tax/reducer';

import { currency } from '../../helpers/format';
import './style.css';

class App extends React.Component {
  props: {
    cartState: CartState,
    cartActions: {
      fetchResults: Function,
      addToCart: Function,
      removeFromCart: Function
    },
    taxState: TaxState,
    taxActions: {
      calculateTaxes: Function
    }
  };

  componentDidMount () {
    this.props.cartActions.fetchResults();
  }

  onItemAdded = (rs: ShopResult) => () => {
    const {
      cartActions: { addToCart },
      taxActions: { calculateTaxes }
    } = this.props;

    addToCart(rs);
    calculateTaxes();
  }

  onItemRemoved = (rs: ShopResult) => () => {
    const {
      cartActions: { removeFromCart },
      taxActions: { calculateTaxes }
    } = this.props;

    removeFromCart(rs);
    calculateTaxes();
  }

  render () {
    const {
      cartState: { results, cart },
      taxState: { taxAmount, isFetching }
    } = this.props;

    return (
      <div className="App">
        <div className="App__header">
          <h2 className="App__title">Album Results</h2>
          <p className="clr-red">Select an album below to add it to your cart.</p>
        </div>

        <div className="App__body container">
          <div>
            <h4 className="Results__title">Results</h4>

            <ul className="Results__list">
              {results.map((rs, i) => (
                <li key={i} className="Result">
                  <p className="Result__album">{rs.album}</p>
                  <p className="Result__artist">{rs.artist}</p>
                  <p className="Result__price">{currency(rs.price)}</p>
                  <button onClick={this.onItemAdded(rs)}>
                    (+) Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="Results__title ta-right">My Cart</h4>

            <ul className="Results__list ta-right">
              {cart.map((rs, i) => (
                <li key={i} className="Result ta-right">
                  <p className="Result__album ta-right">{rs.album}</p>
                  <p className="Result__artist ta-right">{rs.artist}</p>
                  <p className="Result__price ta-right">{currency(rs.price)}</p>
                  <button onClick={this.onItemRemoved(rs)}>
                    (-) Remove
                  </button>
                </li>
              ))}
            </ul>

            <p className="ta-right">
              {isFetching
                ? <span className="clr-red ts-ital">Calculating Taxes...</span>
                : `Taxes: ${currency(taxAmount)}`}
            </p>
            <p className="ta-right">
              Total: {currency(cart.reduce((a, c) => a + c.price, 0))}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state: {
  cart: CartState,
  tax: TaxState
}) {
  return {
    cartState: state.cart,
    taxState: state.tax
  };
}

function mapActionCreators (dispatch: Function) {
  return {
    cartActions: bindActionCreators(actions, dispatch),
    taxActions: bindActionCreators(taxActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(App);
