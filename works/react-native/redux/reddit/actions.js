export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
const receivePosts = ( json) => ({
  type: SELECT_SUBREDDIT,
  posts: json.data.children.map(child => child.data)
})

export const selectSubreddit = subreddit => dispatch => {
return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts( json)))
}