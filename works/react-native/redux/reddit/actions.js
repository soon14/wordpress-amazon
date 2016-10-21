export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const REQUEST_POSTS = 'REQUEST_POSTS'

export const selectSubreddit = subreddit =>  ({
	type: SELECT_SUBREDDIT,
	subreddit
})

const receivePosts =  (subreddit,json) => ({
  type: REQUEST_POSTS,
    subreddit,
  posts: json.data.children.map(child => child.data)
})

const fetchPosts = subreddit => dispatch => {
	console.log('fetch')
	return fetch(`https://www.reddit.com/r/${subreddit}.json`)
	    .then(response => response.json())
	    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state,subreddit) => {
	console.log('------'+subreddit+'-------')
	console.log('------'+state.requestPosts[subreddit]+'-------')
	const posts=state.requestPosts[subreddit]
	if (!posts) {
		return true
	}
	else {
		return false
	}
}
export const fetchPostsIfNeeded = subreddit => (dispatch,getState) => {
	if (shouldFetchPosts(getState(),subreddit)) {
		return dispatch(fetchPosts(subreddit))
	} 
}