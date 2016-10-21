import React, {Component} from 'react'
import {View} from 'react-native'
import Todo from './todo'
export default class TodoList extends Component {

	render() {
		return (
				<View>
					{this.props.todos.map((todo,index)=> <Todo {...todo} key={index} onClick={()=> this.props.onTodoClick(index)} />
											)
							}
				</View>
			)
	}
}