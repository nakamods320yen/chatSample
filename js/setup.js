/**
 * Chat Sample
 * https://github.com/nakamods320yen/chatSample
 * @flow
 */
'use strict';

const React = require('react-native');
const Firebase = require('firebase');
const styles = require('./styles.js');
const { ListView } = React;
var FacebookSDK = require('./FacebookSDK');

var { Provider } = require('react-redux');
const ChatList = require('./ChatList');
var configureStore = require('./configureStore');

var {applyMiddleware, createStore, connect} = require('redux');
//let store = createStore(todos, [ 'Use Redux' ])



function setup(): React.Component {
  FacebookSDK.init();

  class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoading: true,
        // dataSource: new ListView.DataSource({
        //   rowHasChanged: (row1, row2) => row1 !== row2,
        // })
        userID: '',
        store: configureStore(() => this.setState({isLoading: false})),
        // store: {}
      };
      console.log('Root constructor');
      FacebookSDK.login((res) => {
        console.dir(res); // accessToken, expiresIn, userID
        this.setState({userID: res.authResponse.userID});
        console.dir(this.state);
      }, {});
      //this.itemsRef = new Firebase("https://fiery-torch-404.firebaseio.com/items");
    }
    render() {
      // if (this.state.isLoading) {
      //   return null;
      // }
      //<Provider store={this.state.store}>
      return (
        <Provider store={this.state.store}>
          <ChatList/>
        </Provider>
      );
    }
  }

  return Root;
}
// class setup extends React.Component {
//   render() {
//     return (
//       <ChatSample/>
//     );
//   }
// }

module.exports = setup;
