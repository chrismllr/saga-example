// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../../state/cart';
import type { ShopResult } from '../../state/cart/reducer';

import { currency } from '../../helpers/format';
import './style.css';

type AppProps = {
  cart: {
    results: Array<ShopResult>,
    cart: Array<ShopResult>
  },
  cartActions: {
    fetchResults: Function,
    addToCart: Function,
    removeFromCart: Function
  }
};

class App extends React.Component {
  props: AppProps;

  componentDidMount () {
    this.props.cartActions.fetchResults();
  }

  render () {
    const {
      cart: { results, cart },
      cartActions: { addToCart, removeFromCart }
    } = this.props;

    return (
      <div className="App">
        <div className="App__header">
          <h2 className="App__title">Album Results</h2>
          <p className="App__subtitle">Select an album below to add it to your cart.</p>
        </div>

        <div className="container">
          <h4 className="Results__title">Results</h4>

          <ul>
            {results.map((rs, i) => (
              <li key={i} className="Result">
                <p className="Result__album">{rs.album}</p>
                <p className="Result__artist">{rs.artist}</p>
                <p className="Result__price">{currency(rs.price)}</p>
                <button onClick={() => addToCart(rs)}>
                  (+) Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="container">
          <h4 className="Results__title">My Cart</h4>

          <ul>
            {cart.map((rs, i) => (
              <li key={i} className="Result">
                <p className="Result__album">{rs.album}</p>
                <p className="Result__artist">{rs.artist}</p>
                <p className="Result__price">{currency(rs.price)}</p>
                <button onClick={() => removeFromCart(rs)}>
                  (-) Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    cart: state.cart
  };
}

function mapActionCreators (dispatch) {
  return {
    cartActions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(App);
