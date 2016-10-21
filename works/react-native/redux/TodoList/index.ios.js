/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/app'
import todos from './reducers'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
let store= createStore(todos)
class TodoList extends Component {
  render() {
    return (
      <Provider store={store}>
     <App />
     </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TodoList', () => TodoList);
