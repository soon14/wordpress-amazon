export const SELECT_REDDIT = 'SELECT_REDDIT'

const receivePosts = ( json) => ({
  type: SELECT_REDDIT,
  posts: json.data.children.map(child => child.data)
})

export const selectReddit = reddit => dispatch => {
return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts( json)))
}
