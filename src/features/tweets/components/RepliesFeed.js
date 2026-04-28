import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Avatar } from '@mui/material';
import db from '../api/firebase';
import Post from './Post';

function RepliesFeed() {
  const { user } = useUser();
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username =
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split('@')[0] ||
    'user';

  useEffect(() => {
    if (!db || !user) {
      setLoading(false);
      return;
    }

    const unsubscribe = db
      .collectionGroup('comments')
      .where('username', '==', username)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        async (snapshot) => {
          const seen = new Set();
          const pairs = [];

          for (const commentDoc of snapshot.docs) {
            const postId = commentDoc.ref.parent.parent.id;
            if (seen.has(postId)) continue;
            seen.add(postId);

            const postDoc = await db.collection('posts').doc(postId).get();
            if (!postDoc.exists) continue;

            pairs.push({
              post: { id: postDoc.id, ...postDoc.data() },
              comment: { id: commentDoc.id, ...commentDoc.data() },
            });
          }

          setReplies(pairs);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [username, user]);

  if (loading) {
    return <div className="p-8 text-center text-[#536471]">Loading replies…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-[#536471] text-sm">
        <p>Could not load replies.</p>
        <p className="mt-1 text-xs break-all">{error}</p>
      </div>
    );
  }

  if (replies.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold text-[#0f1419]">No replies yet</h3>
        <p className="mt-2 text-[#536471]">When you reply to posts, they'll show up here.</p>
      </div>
    );
  }

  return (
    <div>
      {replies.map(({ post, comment }) => (
        <div key={`${post.id}-${comment.id}`}>
          <Post
            postId={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
          <div className="flex items-start gap-3 border-b border-[#eff3f4] px-4 py-3 bg-[#f7f9f9]">
            <Avatar
              src={comment.avatar || ''}
              alt={comment.displayName}
              sx={{ width: 32, height: 32 }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#0f1419]">
                {comment.displayName}
                <span className="ml-2 font-normal text-[#536471]">@{comment.username}</span>
              </p>
              <p className="mt-1 text-sm text-[#0f1419] break-words">{comment.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RepliesFeed;
