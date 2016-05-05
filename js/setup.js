/**
 * Chat Sample
 * https://github.com/nakamods320yen/chatSample
 * @flow
 */
const React = require('react-native');
const Firebase = require('firebase');
const styles = require('./styles.js');

const ChatSample = require('chatSample');


// function setup(): React.Component {
//   class Root extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         isLoading: true,
//         //store: configureStore(() => this.setState({isLoading: false})),
//       };
//     }
//     render() {
//       if (this.state.isLoading) {
//         return null;
//       }
//       return (
//         <chatSample/>
//       );
//     }
//   }
//
//   return Root;
// }
class setup extends React.Component {
  render() {
    return (
      <ChatSample/>
    );
  }
}

module.exports = setup;
