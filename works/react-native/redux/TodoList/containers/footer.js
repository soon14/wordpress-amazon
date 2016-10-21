import React, {Component} from 'react'
import {View,Text} from 'react-native'
import {Button} from 'native-base'

export default class Footer extends Component {
	renderFilter(filter,name) {
		if (filter === this.props.filter) {
			return (
				<Text>{name}</Text>
				)
		}
		return (
			<Button onPress={() => this.props.onFilterChange(filter)}>
				<Text>{name}</Text>
				</Button>
			)
	}
	render() {
		return (
			<View>
				<Text>Show:</Text>{this.renderFilter('SHOW_ALL','All')}
				{this.renderFilter('SHOW_COMPLETED','Completed')}
				{this.renderFilter('SHOW_ACTIVE','Active')}
			</View>
			)
	}
}