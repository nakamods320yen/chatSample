/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

const React = require('react-native');

const Firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const TextField = require('./components/TextField');
const { AppRegistry, StyleSheet, Text, View, ListView, AlertIOS } = React;
const styles = require('./js/styles.js');

class chatSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = new Firebase("https://fiery-torch-404.firebaseio.com/items");
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          post_time: child.val().post_time,
          _key: child.key()
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }

  componentDidMount() {
    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    // })
    this.listenForItems(this.itemsRef);
  }
  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text, post_time: Firebase.ServerValue.TIMESTAMP })
          }
        },
      ],
      'plain-text'
    );
  }
  _renderItem(item) {
    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };
    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}
          enableEmptySections={true}/>
        <TextField></TextField>
      </View>
    );
    //<ActionButton title="Add" onPress={this._addItem.bind(this)} />
  }
}

AppRegistry.registerComponent('chatSample', () => chatSample);
