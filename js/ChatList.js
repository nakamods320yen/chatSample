/**
 * Chat Sample
 * https://github.com/nakamods320yen/chatSample
 * @flow
 */
const React = require('react-native');
const StatusBar = require('../components/StatusBar');
const ActionButton = require('../components/ActionButton');
const ListItem = require('../components/ListItem');
const TextField = require('../components/TextField');
const LoginButtonFB = require('./login/LoginButtonFB');
var FacebookSDK = require('./FacebookSDK');
import type {State as User} from './reducers/user';

type Props = {
  user: User;
};

// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginButton,
// } = FBSDK;
const styles = require('../js/styles.js');
const { AppRegistry, StyleSheet, Text, View, ListView, AlertIOS, Dimensions } = React;

 class ChatList extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       dataSource: new ListView.DataSource({
         rowHasChanged: (row1, row2) => row1 !== row2,
       })
     };
     var _listView: ListView;
     var _scrollToBottomY;

     console.dir(FacebookSDK.getAuthResponse());
     console.dir(this.props);
     var fb = FacebookSDK.getAuthResponse();
     if(fb) {
       var userID = fb.userID;
       this.setState({userID: userID});
     } else {
      //  FacebookSDK.login((res) => {
      //    console.dir(res); // accessToken, expiresIn, userID
      //    this.setState({userID: res.authResponse.userID});
      //    console.dir(this.state);
      //  }, {});
     }

     console.dir(this);
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
           userID: child.val().userID,
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
     console.dir(this.state);
     console.dir(this.tmpText);

     var userID = this.state.userID;
     if(!userID) {
       console.dir(FacebookSDK.getAuthResponse());
       var fb = FacebookSDK.getAuthResponse();
       if(fb) {
         var userID = fb.userID;
         this.setState({userID: userID});
       }
     }
     this.itemsRef.push({
       title: this.tmpText,
       post_time: Firebase.ServerValue.TIMESTAMP,
       userID: userID
     });
   }
   componentDidUpdate() {
     console.log('_scrollToBottomY: %o', this._scrollToBottomY);
     var {height, width} = Dimensions.get('window');
     console.log('device height: %o', height);
     this._listView.scrollTo({y: this._scrollToBottomY+147-height});
   }
   _onChangeText(text) {
     this.tmpText = text;
   }
   render() {
    //  console.dir(FacebookSDK.getAuthResponse());
    //  var fb = FacebookSDK.getAuthResponse();
    //  if(fb) var userID = fb.userID;
    //  this.setState({userID: userID});
    //  console.dir(this);
    var userID = this.state.userID || '';
     return (
       <View style={styles.container}>
         <StatusBar title="Chat Sample" />
         <ListView
            ref={ (listview) => { this._listView = listview; } }
            onContentSizeChange={(newWidth, newHeight)=>{
              this._scrollToBottomY = newHeight;
            }}
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            style={styles.listview}
            enableEmptySections={true}/>
         <TextField
           onSubmitEditing={this._onSubmitEditing.bind(this)}
           onChangeText={this._onChangeText.bind(this)}/>
       </View>
     );
     //<ActionButton title="Add" onPress={this._addItem.bind(this)} />
   }
 }

 //AppRegistry.registerComponent('chatSample', () => chatSample);
module.exports = ChatList;
