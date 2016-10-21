import React, { Component } from 'react'
import { View, Text } from 'react-native'
import AddTodo from './addtodo'
import TodoList from './todolist'
import Footer from './footer'
import {connect} from 'react-redux'
import {addTodo,completeTodo, setVisibilityFilter} from '../actions'
class App extends Component {
	render () {
		const {dispatch, Todos, visibilityFilter} = this.props
		return (
				<View >
					<AddTodo onAddClick = {text => {console.log('add todo',text) 
													dispatch(addTodo(text))}
													} />
					<TodoList 
					todos={Todos}
					onTodoClick={index => {console.log('todo clicked', index)
											dispatch(completeTodo(index))}
										}/>
					<Footer filter={visibilityFilter} onFilterChange={nextFilter => {console.log('filter change'+nextFilter + 'visibilityFilter' + visibilityFilter)
																			  dispatch(setVisibilityFilter(nextFilter))}
																			}/>
				</View>
				)
	}
}
function selectTodos(todos,filter) {
	switch(filter) {
		case 'SHOW_ALL' :
			return todos
		case 'SHOW_COMPLETED' :
			return todos.filter(todo => todo.completed)
		case 'SHOW_ACTIVE' :
			return todos.filter(todo => !todo.completed)
	}
}
function select(state) {
	return {
		Todos: selectTodos(state.todos,state.visibilityFilter),
		visibilityFilter : state.visibilityFilter
	}
}

export default connect(select)(App)