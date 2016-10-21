import {
  SELECT_REDDIT
} from '../actions'

const selectedReddit = (state ={posts:[{title:'aaa'},{title:'bbb'}]} , action) => {
  switch (action.type) {
    case SELECT_REDDIT:
	  return Object.assign({}, state, {
        posts: action.posts
      })
    default:
      return state
  }
}

export default selectedReddit
