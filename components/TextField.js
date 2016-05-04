'use strict';

const React = require('react-native');
const styles = require('../js/styles.js')
const constants = styles.constants;
const { StyleSheet, Text, View, TextInput} = React;

class TextField extends React.Component {
  render() {
  // onChangeText={(text) => this.setState({text})}
  // value={this.state.text}
  //style={styles.action}
    return (
      <View >
        <TextInput
          style={styles.textField}
        />
      </View>
    );
    // <TouchableHighlight
    //   underlayColor={constants.actionColor}
    //   onPress={this.props.onPress}>
    //   <Text style={styles.actionText}>{this.props.title}</Text>
    // </TouchableHighlight>
  }
}

module.exports = TextField;
