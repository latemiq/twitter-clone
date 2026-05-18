import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import db from '../api/firebase';
import Post from './Post';
import TweetBox from './TweetBox';

const timelineTabs = [
  { id: 'forYou', label: 'For you' },
  { id: 'following', label: 'Following' },
];

const normalizeUsername = (value) => (value || '').replace(/^@/, '').trim().toLowerCase();

function Feed() {
  const { user } = useUser();
  const [activeTimeline, setActiveTimeline] = useState('forYou');
  const [posts, setPosts] = useState([]);
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState(null);
  const [followingError, setFollowingError] = useState(null);

  const followingUsernames = useMemo(
    () => new Set(followingProfiles.map((profile) => normalizeUsername(profile.username))),
    [followingProfiles]
  );

  const visiblePosts = useMemo(() => {
    if (activeTimeline !== 'following') {
      return posts;
    }

    return posts.filter((post) => followingUsernames.has(normalizeUsername(post.username)));
  }, [activeTimeline, followingUsernames, posts]);

  useEffect(() => {
    if (!db) {
      setLoadingPosts(false);
      return undefined;
    }

    setPostsError(null);
    setLoadingPosts(true);

    const unsubscribe = db
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoadingPosts(false);
        },
        (err) => {
          setPostsError(err.message);
          setLoadingPosts(false);
        }
      );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!db || !user?.id) {
      setFollowingProfiles([]);
      return undefined;
    }

    setFollowingError(null);

    const unsubscribe = db
      .collection('users')
      .doc(user.id)
      .collection('following')
      .onSnapshot(
        (snapshot) => {
          setFollowingProfiles(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        },
        (err) => {
          setFollowingError(err.message);
        }
      );

    return () => unsubscribe();
  }, [user?.id]);

  const renderEmptyState = () => {
    if (activeTimeline === 'following') {
      const hasFollowedAccounts = followingProfiles.length > 0;

      return (
        <div className="border-b border-[#eff3f4] px-8 py-10 text-center">
          <h3 className="text-xl font-bold text-[#0f1419]">
            {hasFollowedAccounts ? 'No posts from followed accounts yet' : 'Follow accounts to build this timeline'}
          </h3>
          <p className="mt-2 text-[15px] text-[#536471]">
            {hasFollowedAccounts
              ? 'When people you follow post something, it will show up here.'
              : 'Accounts you follow will show up here when they post.'}
          </p>
        </div>
      );
    }

    return (
      <div className="border-b border-[#eff3f4] px-8 py-10 text-center">
        <h3 className="text-xl font-bold text-[#0f1419]">No posts yet</h3>
        <p className="mt-2 text-[15px] text-[#536471]">When posts are added, they will show up here.</p>
      </div>
    );
  };

  return (
    <div className="feed flex-1 min-w-0 border-r-[1px] border-twitter-background overflow-x-hidden overflow-y-scroll">
      <div className="feed__header sticky top-0 bg-white z-100 border-[1px] border-twitter-background p-0">
        <h1 className="px-4 py-3 text-[20px] font-extrabold text-[#0f1419]">Home</h1>
        <div className="feed__headerTitle flex border-t border-[#eff3f4]">
          {timelineTabs.map((tab) => {
            const isActive = activeTimeline === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTimeline(tab.id)}
                className="relative min-h-[52px] flex-1 border-none bg-transparent px-4 text-center transition hover:bg-gray-100"
              >
                <span
                  className={`text-[15px] ${
                    isActive ? 'font-bold text-[#0f1419]' : 'font-semibold text-[#536471]'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-[#1d9bf0]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      <TweetBox />
      {loadingPosts && <div className="p-8 text-center text-[#536471]">Loading posts...</div>}
      {postsError && (
        <div className="p-8 text-center text-sm text-[#536471]">
          <p>Could not load posts.</p>
          <p className="mt-1 break-all text-xs">{postsError}</p>
        </div>
      )}
      {followingError && (
        <div className="border-b border-[#eff3f4] px-4 py-3 text-sm text-[#536471]">
          Could not load following: <span className="break-all text-xs">{followingError}</span>
        </div>
      )}
      {!loadingPosts && !postsError && visiblePosts.length === 0 && renderEmptyState()}
      {!loadingPosts &&
        !postsError &&
        visiblePosts.map((post) => (
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

export default Feed;
