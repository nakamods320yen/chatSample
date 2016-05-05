/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

 const React = require('react-native');

 const Firebase = require('firebase');
 const StatusBar = require('./components/StatusBar');
 const ActionButton = require('./components/ActionButton');
 const ListItem = require('./components/ListItem');
 const TextField = require('./components/TextField');
 const { AppRegistry, StyleSheet, Text, View, ListView, Alert } = React;
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
   _renderItem(item) {
     const onPress = () => {
       Alert.alert(
         'Delete',
         null,
         [
           {text: 'Delete', onPress: (text) => this.itemsRef.child(item._key).remove()},
           {text: 'Cancel', onPress: (text) => console.log('Cancel')}
         ],
         'default'
       );
     };
     return (
       <ListItem item={item} onPress={onPress} />
     );
   }
   _onSubmitEditing(a, b) {
     console.log('onSubmitEditing');
     console.dir(this.tmpText);
     this.itemsRef.push({ title: this.tmpText, post_time: Firebase.ServerValue.TIMESTAMP })
   }
   _onChangeText(text) {
     this.tmpText = text;
   }
   render() {
     return (
       <View style={styles.container}>
         <StatusBar title="Chat Sample" />
         <ListView
           dataSource={this.state.dataSource}
           renderRow={this._renderItem.bind(this)}
           style={styles.listview}
           enableEmptySections={true}/>
         <TextField
           onSubmitEditing={this._onSubmitEditing.bind(this)}
           onChangeText={this._onChangeText.bind(this)}/>
       </View>
     );
   }
 }

 AppRegistry.registerComponent('chatSample', () => chatSample);
