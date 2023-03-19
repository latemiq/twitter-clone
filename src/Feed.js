import React, {useSate} from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'

function Feed() {
  const [posts, setPosts] = useState([]);
  return (
      <div className='feed'>
        <div className='feed__header'>
        <h2>Home</h2>
      </div>
      <TweetBox />
      <Post
      displayName="Jake Doe"
      username="jakedoe"
      verified={true}
      text="YOOOO its working"
      avatar={"https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"}
      image={'https://media3.giphy.com/media/65ATTdpi3clAdjomZ39/giphy.gif'}
      />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Feed
