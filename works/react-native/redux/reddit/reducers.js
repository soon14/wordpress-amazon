import {
  SELECT_SUBREDDIT
} from './actions'

 const selectedSubreddit = (state ={posts:[{title:'aaa'},{title:'bbb'}]}, action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return Object.assign({}, state, {
        posts: action.posts
      })
    default:
      return state
  }
}

export default selectedSubreddit