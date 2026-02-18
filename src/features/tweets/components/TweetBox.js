import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import db, { serverTimestamp } from '../api/firebase';
import TweetBtn from './TweetBtn';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');

  const sendTweet = (e) => {
    e.preventDefault();

    if (!db) {
      return;
    }

    db.collection('posts').add({
      displayName: 'User',
      username: 'user',
      verified: false,
      text: tweetMessage,
      image: tweetImage,
      avatar: 'https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png',
      createdAt: serverTimestamp(),
    });

    setTweetMessage('');
    setTweetImage('');
  };

  return (
    <div className='tweetBox'>
      <form onSubmit={sendTweet}>
        <div className='tweetBox__input'>
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"/>
          <input
            placeholder="What's hapening"
            type="text"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
        </div>
        <input
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
        />
        {/* <Button className="tweetBox__tweetButton" type='submit'>Tweet</Button> */}
        <div className="tweetBox__actions">
          <TweetBtn onClick={sendTweet} />
        </div>
        
      </form>
    </div>
  );
}

export default TweetBox;

