import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Pickers from './pickers'
import Posts from './posts'
import { connect } from 'react-redux'
import { selectSubreddit,fetchPostsIfNeeded } from '../actions'
class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

   componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }
  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
  }
  render() {
    const { selectedSubreddit,posts } = this.props
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to React Native!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     To get started, edit index.android.js
      //   </Text>
      //   <Text style={styles.instructions}>
      //     Double tap RRR on your keyboard to reload,{'\n'}
      //     Shake or press menu button for dev menu
      //   </Text>
      // </View>
      <View>
      <Pickers value={selectedSubreddit} onChange={this.handleChange} options={[ 'reactjs', 'frontend' ]}/>
      {
        posts&&posts.length>0&&
        <Posts posts={posts}/>
      }
      </View>
    );
  }
}
function mapStateToProps(state) {
  const { selectedSubreddit, requestPosts } = state
  const {
          item: posts
        } = requestPosts[selectedSubreddit] || {
          item: []
        }

  return {
    selectedSubreddit,
    posts
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
export default connect(mapStateToProps)(AsyncApp)