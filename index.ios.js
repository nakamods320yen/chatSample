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
    AlertIOS.alert(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
    );
  }
  _renderItem(item) {
    return (
      <ListItem item={item} onPress={() => {}} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Grocery List" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview}/>
        <ActionButton title="Add" onPress={this._addItem.bind(this)} />
      </View>
    );
  }
}

AppRegistry.registerComponent('chatSample', () => chatSample);
