import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native'
export default class Pickers extends Component {
  render() {
    const {options,onChange} = this.props
    return (
      <View>
      <Picker onValueChange={(opt)=>onChange(opt)}>
        {options.map(option =>
            <Picker.Item label={option} value={option} />)
          }
      </Picker>
      </View>
    );
  }
}

