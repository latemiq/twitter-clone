import React from 'react'
import './Post.css'
import { Avatar } from "@mui/material"
function Post({
    displayName,
    username,
    verified,
    timestamp,
    text,
    image,
    avatar
}) {
  return (
    <div className='post'>
      <div className='post__avatar'>
        <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
      </div>
      <div className='post__body'>
        
      </div>
    </div>
  )
}

export default Post
