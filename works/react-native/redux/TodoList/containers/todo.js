import React, {Component} from 'react'
import {View,Text} from 'react-native'
import {Button} from 'native-base'
export default class Todo extends Component {
	render() {
		return (
				<Button onPress={this.props.onClick}>
				<Text style={{textDecorationLine:this.props.completed?'line-through':'none'}}>{this.props.text}</Text>
				</Button>
			)
	}
}