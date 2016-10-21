import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectReddit} from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class App extends Component {
  


  handleChange = nextReddit => {
    this.props.dispatch(selectReddit(nextReddit))
  }

  

  render() {
    const { posts } = this.props
    return (
      <div>
        <Picker onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
          
              <Posts posts={posts} />
      </div>
    )
  }
}

const mapStateToProps = state => {return {
    posts:state.posts
  }
}

export default connect(mapStateToProps)(App)
