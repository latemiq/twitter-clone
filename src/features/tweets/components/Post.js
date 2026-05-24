import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublishIcon from '@mui/icons-material/Publish';
import RepeatIcon from '@mui/icons-material/Repeat';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useUser } from '@clerk/nextjs';
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from 'react';
import db, { serverTimestamp } from '../api/firebase';
import FollowButton, { normalizeUsername } from '../../social/components/FollowButton';

function Post({
  postId,
  userId: postUserId,
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isReposted, setIsReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [isCommenting, setIsCommenting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingLike, setIsSubmittingLike] = useState(false);
  const [isSubmittingRepost, setIsSubmittingRepost] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isSubmittingHighlight, setIsSubmittingHighlight] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSubmittingBookmark, setIsSubmittingBookmark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editText, setEditText] = useState(text || '');
  const [editImage, setEditImage] = useState(image || '');
  const [isSavingPost, setIsSavingPost] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [postActionError, setPostActionError] = useState(null);
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
  const authorUsernameKey = normalizeUsername(username);
  const viewerUsernameKey = normalizeUsername(commenterUsername);
  const isOwnPost = Boolean(
    user?.id &&
      ((postUserId && postUserId === user.id) ||
        authorUsernameKey === viewerUsernameKey)
  );

  useEffect(() => {
    if (isEditingPost) {
      return;
    }

    setEditText(text || '');
    setEditImage(image || '');
  }, [image, isEditingPost, text]);

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

  useEffect(() => {
    if (!db || !postId) {
      setLikeCount(0);
      setIsLiked(false);
      return undefined;
    }

    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('likes')
      .onSnapshot((snapshot) => {
        setLikeCount(snapshot.docs.length);
        setIsLiked(Boolean(user?.id && snapshot.docs.some((doc) => doc.id === user.id)));
      });

    return () => unsubscribe();
  }, [postId, user?.id]);

  useEffect(() => {
    if (!db || !postId) {
      setRepostCount(0);
      setIsReposted(false);
      return undefined;
    }

    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('reposts')
      .onSnapshot((snapshot) => {
        setRepostCount(snapshot.docs.length);
        setIsReposted(Boolean(user?.id && snapshot.docs.some((doc) => doc.id === user.id)));
      });

    return () => unsubscribe();
  }, [postId, user?.id]);

  useEffect(() => {
    if (!db || !postId || !user?.id) {
      setIsBookmarked(false);
      return undefined;
    }

    const unsubscribe = db
      .collection('users')
      .doc(user.id)
      .collection('bookmarks')
      .doc(postId)
      .onSnapshot((doc) => {
        setIsBookmarked(doc.exists);
      });

    return () => unsubscribe();
  }, [postId, user?.id]);

  useEffect(() => {
    if (!db || !postId || !user?.id) {
      setIsHighlighted(false);
      return undefined;
    }

    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('highlights')
      .doc(user.id)
      .onSnapshot((doc) => {
        setIsHighlighted(doc.exists);
      });

    return () => unsubscribe();
  }, [postId, user?.id]);

  const handleHighlightToggle = async () => {
    if (!db || !postId || !isOwnPost || isSubmittingHighlight) return;

    setIsSubmittingHighlight(true);

    const highlightRef = db
      .collection('posts')
      .doc(postId)
      .collection('highlights')
      .doc(user.id);

    try {
      if (isHighlighted) {
        await highlightRef.delete();
      } else {
        await highlightRef.set({
          userId: user.id,
          displayName: commenterDisplayName,
          username: commenterUsername,
          avatar: commenterAvatar,
          createdAt: serverTimestamp(),
        });
      }
    } finally {
      setIsSubmittingHighlight(false);
    }
  };

  const handleBookmarkToggle = async () => {
    if (!db || !postId || !user?.id || isSubmittingBookmark) {
      return;
    }

    setIsSubmittingBookmark(true);
    setPostActionError(null);

    const bookmarkRef = db
      .collection('users')
      .doc(user.id)
      .collection('bookmarks')
      .doc(postId);

    try {
      if (isBookmarked) {
        await bookmarkRef.delete();
      } else {
        await bookmarkRef.set({
          postId,
          userId: postUserId || '',
          displayName: displayName || 'User',
          username: username || 'user',
          avatar: avatar || '',
          textPreview: (text || '').slice(0, 180),
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      setPostActionError(err.message);
    } finally {
      setIsSubmittingBookmark(false);
    }
  };

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

  const handleLikeToggle = async () => {
    if (!db || !postId || !user?.id || isSubmittingLike) {
      return;
    }

    setIsSubmittingLike(true);

    const likeRef = db
      .collection('posts')
      .doc(postId)
      .collection('likes')
      .doc(user.id);

    try {
      if (isLiked) {
        await likeRef.delete();
      } else {
        await likeRef.set({
          userId: user.id,
          displayName: commenterDisplayName,
          username: commenterUsername,
          avatar: commenterAvatar,
          createdAt: serverTimestamp(),
        });
      }
    } finally {
      setIsSubmittingLike(false);
    }
  };

  const handleRepostToggle = async () => {
    if (!db || !postId || !user?.id || isSubmittingRepost) {
      return;
    }

    setIsSubmittingRepost(true);

    const repostRef = db
      .collection('posts')
      .doc(postId)
      .collection('reposts')
      .doc(user.id);

    try {
      if (isReposted) {
        await repostRef.delete();
      } else {
        await repostRef.set({
          userId: user.id,
          displayName: commenterDisplayName,
          username: commenterUsername,
          avatar: commenterAvatar,
          createdAt: serverTimestamp(),
        });
      }
    } finally {
      setIsSubmittingRepost(false);
    }
  };

  const startEditingPost = () => {
    setEditText(text || '');
    setEditImage(image || '');
    setPostActionError(null);
    setIsEditingPost(true);
    setIsMenuOpen(false);
  };

  const cancelEditingPost = () => {
    setEditText(text || '');
    setEditImage(image || '');
    setPostActionError(null);
    setIsEditingPost(false);
  };

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();

    const nextText = editText.trim();
    const nextImage = editImage.trim();

    if (!db || !postId || !isOwnPost || isSavingPost || (!nextText && !nextImage)) {
      return;
    }

    setIsSavingPost(true);
    setPostActionError(null);

    try {
      await db.collection('posts').doc(postId).update({
        text: nextText,
        image: nextImage,
        editedAt: serverTimestamp(),
      });

      setIsEditingPost(false);
    } catch (err) {
      setPostActionError(err.message);
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleDeletePost = async () => {
    if (!db || !postId || !isOwnPost || isDeletingPost) {
      return;
    }

    if (!window.confirm('Delete this post?')) {
      setIsMenuOpen(false);
      return;
    }

    setIsDeletingPost(true);
    setPostActionError(null);

    try {
      await db.collection('posts').doc(postId).delete();
    } catch (err) {
      setPostActionError(err.message);
      setIsDeletingPost(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className='post flex w-full items-start border-b-[1px] border-twitter-background pb-[10px]'>
      <div className='post__avatar p-[20px]'>
        <Avatar src={avatar || "https://i.pinimg.com/736x/7a/97/5d/7a975dd685017a84f9bc0b520a65ae20.jpg"} />
      </div>
      <div className='post__body flex-1 min-w-0 p-[10px]'>
        <div className='post__header'>
          <div className="flex items-start justify-between gap-3">
            <div className='post__headerText min-w-0'>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className='text-[15px] mb-[5px] break-words'>
                  {displayName}{""}
                  <span className='post__headerSpecial font-[600] text-[12px] text-gray-500'>
                    {verified && <VerifiedUserIcon className="post__badge  text-[14px] text-twitter-color" />}</span>@{username}
                </h3>
                <FollowButton
                  profile={{
                    userId: postUserId,
                    displayName,
                    username,
                    avatar,
                  }}
                  onError={setPostActionError}
                />
              </div>
            </div>
            {isOwnPost && (
              <div className="relative shrink-0">
                <button
                  type="button"
                  aria-label="Post options"
                  aria-expanded={isMenuOpen}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  disabled={isDeletingPost}
                  className={`rounded-full border-none bg-transparent p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#0f1419] ${
                    isDeletingPost ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                  }`}
                >
                  <MoreHorizIcon fontSize="small" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-xl border border-[#eff3f4] bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      onClick={startEditingPost}
                      className="flex w-full items-center gap-3 border-none bg-white px-4 py-3 text-left text-sm font-semibold text-[#0f1419] transition hover:bg-[#f7f9f9]"
                    >
                      <EditIcon fontSize="small" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleDeletePost}
                      disabled={isDeletingPost}
                      className={`flex w-full items-center gap-3 border-none bg-white px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 ${
                        isDeletingPost ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                      }`}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                      {isDeletingPost ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {isEditingPost ? (
            <form onSubmit={handleEditPostSubmit} className="mb-[10px]">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="What's happening"
                rows={3}
                className="w-full resize-none rounded-2xl border border-twitter-background px-4 py-3 text-[15px] outline-none focus:border-twitter-color"
              />
              <input
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                placeholder="Optional: Enter image URL"
                type="text"
                className="mt-2 w-full rounded-2xl border border-twitter-background px-4 py-3 text-sm outline-none focus:border-twitter-color"
              />
              {postActionError && (
                <p className="mt-2 break-all text-xs text-red-600">{postActionError}</p>
              )}
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cancelEditingPost}
                  disabled={isSavingPost}
                  className="rounded-full border border-[#cfd9de] bg-white px-4 py-2 text-sm font-semibold text-[#0f1419] transition hover:bg-[#f7f9f9] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPost || (!editText.trim() && !editImage.trim())}
                  className="rounded-full bg-[var(--twiter-color)] px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSavingPost ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          ) : (
            <div className='post__headerDescription mb-[10px] text-[15px] '>
              <p>{text}</p>
              {postActionError && (
                <p className="mt-2 break-all text-xs text-red-600">{postActionError}</p>
              )}
            </div>
          )}
        </div>
        {!isEditingPost && image && (
          <img
            src={image}
            alt='Post attachment'
            className='block w-full max-w-full h-auto max-h-[520px] rounded-[20px] object-cover'
            loading='lazy'
          />
        )}
        {isReposted && (
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-green-600">
            <RepeatIcon fontSize="small" />
            <span>Podajesz dalej jako @{commenterUsername}</span>
          </div>
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

          <button
            type="button"
            onClick={handleRepostToggle}
            disabled={!db || !user?.id || isSubmittingRepost}
            className={`group flex items-center border-none bg-transparent p-0 ${
              isReposted ? 'text-green-500' : 'text-gray-500'
            } ${!db || !user?.id || isSubmittingRepost ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <div
              className={`rounded-full p-2 transition-all ${
                isReposted ? 'bg-green-100 text-green-500' : 'group-hover:bg-green-100 group-hover:text-green-500'
              }`}
            >
              <RepeatIcon fontSize="small" />
            </div>
            <span className={`text-xs ${isReposted ? 'text-green-500' : 'group-hover:text-green-500'}`}>
              {repostCount}
            </span>
          </button>

          <button
            type="button"
            onClick={handleLikeToggle}
            disabled={!db || !user?.id || isSubmittingLike}
            className={`group flex items-center border-none bg-transparent p-0 ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            } ${!db || !user?.id || isSubmittingLike ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <div
              className={`rounded-full p-2 transition-all ${
                isLiked ? 'bg-red-100 text-red-500' : 'group-hover:bg-red-100 group-hover:text-red-500'
              }`}
            >
              {isLiked ? (
                <FavoriteIcon fontSize="small" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </div>
            <span className={`text-xs ${isLiked ? 'text-red-500' : 'group-hover:text-red-500'}`}>
              {likeCount}
            </span>
          </button>


          {isOwnPost && (
            <button
              type="button"
              onClick={handleHighlightToggle}
              disabled={!db || isSubmittingHighlight}
              className={`group flex items-center border-none bg-transparent p-0 ${
                isHighlighted ? 'text-yellow-500' : 'text-gray-500'
              } ${!db || isSubmittingHighlight ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
            >
              <div
                className={`rounded-full p-2 transition-all ${
                  isHighlighted
                    ? 'bg-yellow-100 text-yellow-500'
                    : 'group-hover:bg-yellow-100 group-hover:text-yellow-500'
                }`}
              >
                {isHighlighted ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
              </div>
            </button>
          )}

          <button
            type="button"
            onClick={handleBookmarkToggle}
            disabled={!db || !user?.id || isSubmittingBookmark}
            className={`group flex items-center border-none bg-transparent p-0 ${
              isBookmarked ? 'text-[#1d9bf0]' : 'text-gray-500'
            } ${!db || !user?.id || isSubmittingBookmark ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          >
            <div
              className={`rounded-full p-2 transition-all ${
                isBookmarked ? 'bg-blue-100 text-[#1d9bf0]' : 'group-hover:bg-blue-100 group-hover:text-[#1d9bf0]'
              }`}
            >
              {isBookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
            </div>
          </button>

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
