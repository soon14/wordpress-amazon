import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
export default class Posts extends Component {
  render() {
    return (
      <View>
      {this.props.posts.map((post, i) =>
          <Text> {post.title} </Text> 
        )}
      </View>
    );
  }
}
