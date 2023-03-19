import React from 'react';
import './Widgets.css';
import{
  TwitterTimeEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterTimelineEmbed,
}from  "react-twitter-embed"
import SearchIcon from '@mui/icons-material/Search';
import Twitter from '@mui/icons-material/Twitter';

function Widgets() {
  return (
    <div className='widgets'>
      <div className='widgets__input'>
        <SearchIcon className='widgets__searchIcon' />
        <input placeholder='Search Twitter' type="text"/>
      </div>

     <div className='widgets__widgetContainer'>
      <h2>What's happening</h2>

      <TwitterTweetEmbed tweetId={"858551177860055040"} />
      <TwitterTimelineEmbed 
      sourceType='profile'
      screenName='kowalskij'
      options={{height:400}}
      />

      <TwitterShareButton 
      url={'https://facebook.com/cleaverprogrammer'}
      options={{text: "#reactjs is awesome", via: "kowalskij"}}
      />

     </div>

    </div>
  )
}

export default Widgets
