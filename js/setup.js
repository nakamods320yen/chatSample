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

var { Provider } = require('react-redux');
const ChatList = require('./ChatList');


function setup(): React.Component {
  class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoading: true,
        // dataSource: new ListView.DataSource({
        //   rowHasChanged: (row1, row2) => row1 !== row2,
        // })
        //store: configureStore(() => this.setState({isLoading: false})),
      };
      //this.itemsRef = new Firebase("https://fiery-torch-404.firebaseio.com/items");
    }
    render() {
      // if (this.state.isLoading) {
      //   return null;
      // }
      //<Provider store={this.state.store}>
      return (
        <Provider>
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
