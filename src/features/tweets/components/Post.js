import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import RepeatIcon from '@mui/icons-material/Repeat';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Avatar } from "@mui/material";
import React from 'react';
import './Post.css';

function Post({displayName, username,verified,text,image,avatar}) {
  return (
    <div className='post flex items-start border-b-[1px] border-twitter-background pb-[10px]'>
      <div className='post__avatar p-[20px]'>
        <Avatar src="https://i.pinimg.com/736x/7a/97/5d/7a975dd685017a84f9bc0b520a65ae20.jpg" />
      </div>
      <div className='post__body flex-1 p-[10px]'>
        <div className='post__header'>
            <div className='post__headerText'>
                <h3 className='text-[15px] mb-[5px]'>
                    {displayName}{""}
                    <span className='post__headerSpecial font-[600] text-[12px] text-gray-500'> 
                    {verified && <VerifiedUserIcon className="post__badge  text-[14px] text-twitter-color" />}</span>@{username}
                </h3>
            </div>
            <div className='post__headerDescription mb-[10px] text-[15px] '>
                <p>{text}</p>
            </div>
        </div>
        <img src={image} alt=''/>
      <div className='post__footer flex justify-between mt-[20px]'>
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
      </div>
      </div>
    </div>
  )
}

export default Post
