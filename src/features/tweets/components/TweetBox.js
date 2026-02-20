import { Avatar } from '@mui/material';
import { useUser } from '@clerk/nextjs';
import React, { useMemo, useState } from 'react';
import db, { serverTimestamp } from '../api/firebase';
import TweetBtn from './TweetBtn';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState('');
  const { user } = useUser();

  const displayName = useMemo(() => {
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();
    return fullName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User';
  }, [user]);

  const username = useMemo(() => {
    return user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'user';
  }, [user]);

  const avatarUrl = user?.imageUrl || '';

  const sendTweet = (e) => {
    e.preventDefault();

    if (!db) {
      return;
    }

    db.collection('posts').add({
      displayName,
      username,
      verified: false,
      text: tweetMessage,
      image: tweetImage,
      avatar: avatarUrl,
      createdAt: serverTimestamp(),
    });

    setTweetMessage('');
    setTweetImage('');
  };

  return (
    <div className='tweetBox'>
      <form onSubmit={sendTweet}>
        <div className='tweetBox__input'>
          <Avatar src={avatarUrl} alt={displayName} />
          <input
            placeholder="What's happening"
            type="text"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
        </div>
        <input
          className='tweetBox__imageInput'
          placeholder='Optional: Enter image URL'
          type='text'
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
        />
        <div className='tweetBox__actions'>
          <TweetBtn onClick={sendTweet} />
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
