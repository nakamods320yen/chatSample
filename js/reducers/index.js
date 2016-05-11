'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  todos: require('./todos'),
  config: require('./config'),
  // notifications: require('./notifications'),
  // maps: require('./maps'),
  // sessions: require('./sessions'),
  //user: require('./user'),
  // schedule: require('./schedule'),
  // topics: require('./topics'),
  // filter: require('./filter'),
  //navigation: require('./navigation'),
  // friendsSchedules: require('./friendsSchedules'),
  // surveys: require('./surveys'),
});
