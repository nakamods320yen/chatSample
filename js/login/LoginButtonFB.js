'use strict';

const React = require('react-native');
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight} = React;

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} = FBSDK;

// https://github.com/facebook/react-native-fbsdk
//Create response callback.
// _responseInfoCallback(error: ?Object, result: ?Object) {
//   if (error) {
//     alert('Error posting data: ' + error.toString());
//   } else {
//     alert('Success posting data: ' + result.toString());
//   }
// }

// Start the graph request.
//new GraphRequestManager().addRequest(infoRequest).start();

// Create a graph request asking for user information with a callback to handle the response.
const infoRequest = new GraphRequest(
  '/me',
  null,
  this._responseInfoCallback,
);
// Start the graph request.
// new GraphRequestManager().addRequest(infoRequest).start();

class LoginButtonFB extends React.Component {
  render() {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (!result) {
                alert("no result");
              } else if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                alert("login has finished with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}
module.exports = LoginButtonFB;
