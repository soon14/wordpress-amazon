import { combineReducers } from 'redux'
function todos(state=[{text:'aaa',completed:true},{text:'bbb',completed:false}],action) {
  switch (action.type) {
    case 'ADD_TODO' :
      return [
            ...state,
            {
              text: action.text,
              completed: false
            }]
    case 'COMPLETE_TODO' :
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

function visibilityFilter( state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'VISIBILITY_FILTER':
      return action.filter 
    default:
      return state
  }
}

// function todoApp(state={},action) {
//   return {todos: todos(state.todos,action)}
// }

const todoApp = combineReducers({visibilityFilter, todos})
export default todoApp
