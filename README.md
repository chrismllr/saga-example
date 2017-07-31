# Redux Saga: Shopping Cart example
The objective of this project is to display some real-world use cases for using the `redux-saga` middelware in place of `redux-thunk` for your async actions.

This project was bootstrapped using `create-react-app`. Refer to the `CRA_README.md` for all CRA related q's.

### Up and running
Install Dependencies
```
yarn
```

Start Dev Server
```
yarn start
```

In a separate tab, Run db
> This uses the [`json-server`](https://github.com/typicode/json-server) package, which is a wonderful way to mock out some API responses for prototyping.
```
json-server db.json --port=3001
```

### Todo:
- saga to calculate taxes as items are removed and added to cart
- "cancel" the stream for tax calculation?
