/**
 * Chat Sample
 * https://github.com/nakamods320yen/chatSample
 * @flow
 */
'use strict';

var {applyMiddleware, createStore} = require('redux');
// var thunk = require('redux-thunk');
import thunk from 'redux-thunk';

var promise = require('./promise');
var array = require('./array');
var analytics = require('./analytics');
var reducers = require('./reducers');
var createLogger = require('redux-logger');
var {persistStore, autoRehydrate} = require('redux-persist');
var {AsyncStorage} = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createCSStore = applyMiddleware(thunk, promise, array, analytics, logger)(createStore);
// var createCSStore = applyMiddleware(thunk, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  const store = autoRehydrate()(createCSStore)(reducers);
  // const store = createStore(
  //   reducers,
  //   undefined,
  //   applyMiddleware(thunk, promise, array, analytics, logger)
  // );
  persistStore(store, {storage: AsyncStorage}, onComplete);

  // by the video

  // const store = createStore(reducers);
  // store.subscribe(() =>
  //   console.log(store.getState())
  // );

  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}





module.exports = configureStore;
