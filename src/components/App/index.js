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

  get total (): number {
    const {
      cartState: { cart },
      taxState: { taxAmount }
    } = this.props;

    const net = cart.reduce(
      (a: number, c: ShopResult) => a + c.price,
      0
    );

    return net + taxAmount;
  }

  render () {
    const {
      cartState: { results, cart },
      taxState: { taxAmount, isFetching }
    } = this.props;

    return (
      <div className="App">
        <div className="App__header">
          <div className="container">
            <h2 className="App__title">Album Results</h2>
            <p className="clr-red">Select an album below to add it to your cart.</p>
          </div>
        </div>

        <div className="App__body container">
          <div className="App__body__col pr-large">
            <h4 className="Results__title">Results</h4>

            <ul className="Results__list">
              {results.map((rs, i) => (
                <li key={i} className="Result">
                  <div>
                    <p className="Result__album">{rs.album}</p>
                    <p className="Result__artist">{rs.artist}</p>
                  </div>
                  <div className="ta-right">
                    <p className="Result__price">{currency(rs.price)}</p>
                    <button onClick={this.onItemAdded(rs)}>
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
                </h5>
              }
              {cart.map((rs, i) => (
                <li key={i} className="OrderResult">
                  <div>
                    <p className="OrderResult__album">{rs.album}</p>
                    <p className="OrderResult__artist">{rs.artist}</p>
                  </div>
                  <div className="ta-right">
                    <p className="OrderResult__price">{currency(rs.price)}</p>
                    <button onClick={this.onItemRemoved(rs)}>
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
                Total: {currency(this.total)}
              </p>
            </div>
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
