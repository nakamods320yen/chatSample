'use strict';

const React = require('react-native');
const styles = require('../styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight} = React;

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

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
