import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import db from '../api/firebase';
import Post from './Post';

function PostsFeed() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
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
      .collection('posts')
      .where('username', '==', username)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
    return <div className="p-8 text-center text-[#536471]">Loading posts…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-[#536471] text-sm">
        <p>Could not load posts.</p>
        <p className="mt-1 text-xs break-all">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold text-[#0f1419]">No posts yet</h3>
        <p className="mt-2 text-[#536471]">When you post something, it'll show up here.</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          userId={post.userId}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default PostsFeed;
