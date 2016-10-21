import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT,
  REQUEST_POSTS
} from './actions'

 const selectedSubreddit = (state ='reactjs', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}
 const requestPosts = (state ={posts:[{title:'aaa'},{title:'bbb'}]}, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        posts: action.posts
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  requestPosts,
  selectedSubreddit
})
export default rootReducer