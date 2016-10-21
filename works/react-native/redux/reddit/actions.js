export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'

export const selectSubreddit = subreddit =>  ({
	type: SELECT_SUBREDDIT,
	subreddit
})

const receivePosts =  json => ({
  type: REQUEST_POSTS,
  posts: json.data.children.map(child => child.data)
})

export const requestPosts = subreddit => dispatch => {
return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts( json)))
}