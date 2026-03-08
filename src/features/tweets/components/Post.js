import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PublishIcon from '@mui/icons-material/Publish';
import RepeatIcon from '@mui/icons-material/Repeat';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useUser } from '@clerk/nextjs';
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from 'react';
import db, { serverTimestamp } from '../api/firebase';

function Post({ postId, displayName, username, verified, text, image, avatar }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { user } = useUser();

  const commenterDisplayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    'User';
  const commenterUsername =
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    'user';
  const commenterAvatar = user?.imageUrl || '';

  useEffect(() => {
    if (!db || !postId) {
      return undefined;
    }

    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });

    return () => unsubscribe();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const trimmedComment = commentText.trim();

    if (!trimmedComment || !db || !postId || isSubmittingComment) {
      return;
    }

    setIsSubmittingComment(true);

    try {
      await db.collection('posts').doc(postId).collection('comments').add({
        displayName: commenterDisplayName,
        username: commenterUsername,
        avatar: commenterAvatar,
        text: trimmedComment,
        createdAt: serverTimestamp(),
      });

      setCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className='post flex w-full items-start border-b-[1px] border-twitter-background pb-[10px]'>
      <div className='post__avatar p-[20px]'>
        <Avatar src={avatar || "https://i.pinimg.com/736x/7a/97/5d/7a975dd685017a84f9bc0b520a65ae20.jpg"} />
      </div>
      <div className='post__body flex-1 min-w-0 p-[10px]'>
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
        {image && (
          <img
            src={image}
            alt='Post attachment'
            className='block w-full max-w-full h-auto max-h-[520px] rounded-[20px] object-cover'
            loading='lazy'
          />
        )}
        <div className='post__footer flex justify-between mt-[20px]'>
          <button
            type="button"
            onClick={() => setIsCommenting((prev) => !prev)}
            className="group flex items-center border-none bg-transparent p-0 text-gray-500 cursor-pointer"
          >
            <div className="p-2 group-hover:bg-blue-100 group-hover:text-blue-500 rounded-full transition-all">
              <ChatBubbleOutlineIcon fontSize="small" />
            </div>
            <span className="text-xs group-hover:text-blue-500">{comments.length}</span>
          </button>

          <div className="group flex items-center text-gray-500 cursor-pointer">
            <div className="p-2 group-hover:bg-green-100 group-hover:fill-green-500 rounded-full transition-all">
              <RepeatIcon fontSize="small" />
            </div>
            <span className="text-xs group-hover:text-green-500">5</span>
          </div>

          <div
            className={`group flex items-center cursor-pointer ${isLiked ? "text-red-500" : "text-gray-500"}`}
            onClick={() => setIsLiked((prev) => !prev)}
          >
            <div>
              {isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </div>
            <span className={`text-xs ${isLiked ? "text-red-500" : "group-hover:text-red-500"}`}>24</span>
          </div>


          <div className="group flex items-center text-gray-500 cursor-pointer">
            <div className="p-2 group-hover:bg-blue-100 group-hover:text-blue-500 rounded-full transition-all">
              <PublishIcon fontSize="small" />
            </div>
          </div>
        </div>

        {isCommenting && (
          <div className="mt-4 border-t border-twitter-background pt-4">
            <form onSubmit={handleCommentSubmit} className="flex gap-3">
              <Avatar src={commenterAvatar} alt={commenterDisplayName} />
              <div className="flex-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment"
                  className="w-full rounded-2xl border border-twitter-background px-4 py-3 text-sm outline-none focus:border-twitter-color"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-gray-500">
                    {db ? 'Click Comment to add your reply.' : 'Configure Firebase to save comments.'}
                  </p>
                  <button
                    type="submit"
                    disabled={!commentText.trim() || !db || isSubmittingComment}
                    className="rounded-full bg-[var(--twiter-color)] px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingComment ? 'Sending...' : 'Comment'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-4 space-y-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-2xl bg-[#f7f9f9] px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={comment.avatar || "https://i.pinimg.com/736x/7a/97/5d/7a975dd685017a84f9bc0b520a65ae20.jpg"}
                        alt={comment.displayName || 'User'}
                        sx={{ width: 32, height: 32 }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {comment.displayName || 'User'}
                          <span className="ml-2 font-normal text-gray-500">
                            @{comment.username || 'user'}
                          </span>
                        </p>
                        <p className="mt-1 break-words text-sm text-gray-800">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet. Be the first to add one.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Post
