'use strict';

const React = require('react-native');
const styles = require('../js/styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TextInput, TouchableHighlight} = React;

class TextField extends React.Component {
  render() {
  // onChangeText={(text) => this.setState({text})}
  // value={this.state.text}
  //style={styles.action}
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View >
          <TextInput
            onSubmitEditing={this.props.onSubmitEditing}
            onChangeText={this.props.onChangeText}
            style={styles.textField}
          />
        </View>
      </TouchableHighlight>
    );
    // <TouchableHighlight
    //   underlayColor={constants.actionColor}
    //   onPress={this.props.onPress}>
    //   <Text style={styles.actionText}>{this.props.title}</Text>
    // </TouchableHighlight>
  }
}

module.exports = TextField;
