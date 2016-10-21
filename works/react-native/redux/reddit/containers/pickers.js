import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Picker
} from 'react-native'
export default class Pickers extends Component {
  render() {
    const {value,options,onChange} = this.props
    return (
      <View>
      <Picker selectedValue={value} onValueChange={(opt)=>onChange(opt)}>
        {options.map(option =>
            <Picker.Item label={option} value={option} />)
          }
      </Picker>
      </View>
    );
  }
}

