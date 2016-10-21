import React, {Component} from 'react'
import {View, TextInput, } from 'react-native'
import {Button} from 'native-base'

export default class AddTodo extends Component {
	propTypes:{
		onAddClick : PropTypes.func.isRequired
	}
	render () {
		return (
				<View>
					<TextInput ref='input' style={{height: 40, borderColor: 'gray', borderWidth: 1,marginTop:100}} placeholder='example name'/>
					<Button onPress={() => this.handleClick()}> Add </Button>
				</View>
			)
	}

	handleClick() {
		console.log(this.refs.input. _lastNativeText)
		this.props.onAddClick(this.refs.input. _lastNativeText)
	}
}
