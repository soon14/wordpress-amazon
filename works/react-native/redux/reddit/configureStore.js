import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk' 
import selectedSubreddit from './reducers'


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware 
)(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(selectedSubreddit, initialState)
}