import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import db from '../api/firebase';
import Post from './Post';

function HighlightsFeed() {
  const { user } = useUser();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!db || !user?.id) {
      setLoading(false);
      return;
    }

    const unsubscribe = db
      .collectionGroup('highlights')
      .where('userId', '==', user.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        async (snapshot) => {
          const posts = [];
          for (const doc of snapshot.docs) {
            const postId = doc.ref.parent.parent.id;
            const postDoc = await db.collection('posts').doc(postId).get();
            if (!postDoc.exists) continue;
            posts.push({ id: postDoc.id, ...postDoc.data() });
          }
          setHighlights(posts);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [user?.id]);

  if (loading) {
    return <div className="p-8 text-center text-[#536471]">Loading highlights…</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-[#536471] text-sm">
        <p>Could not load highlights.</p>
        <p className="mt-1 text-xs break-all">{error}</p>
      </div>
    );
  }

  if (highlights.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-xl font-bold text-[#0f1419]">No highlights yet</h3>
        <p className="mt-2 text-[#536471]">
          Pin your best posts here — tap the star icon on any of your posts.
        </p>
      </div>
    );
  }

  return (
    <div>
      {highlights.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
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

export default HighlightsFeed;
