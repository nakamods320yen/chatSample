'use strict';
var React = require('react-native');
const styles = require('../js/styles.js');
var ProfilePicture = require('../js/common/ProfilePicture');
const { View, TouchableHighlight, Text } = React;
class ListItem extends React.Component {
  render() {
    console.dir(this.props.item);
    var post_time_obj = new Date(this.props.item.post_time);
    var post_time_str = post_time_obj.toLocaleDateString() + ' ' + post_time_obj.toLocaleTimeString()
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.li}>
          <ProfilePicture userID={this.props.item.userID} size={18} />
          <Text style={styles.liPostTime}>{post_time_str}</Text>
          <Text style={styles.liText}>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = ListItem;
