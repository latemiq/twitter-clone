import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import db, { serverTimestamp } from '../../tweets/api/firebase';

export const normalizeUsername = (value) => (value || '').replace(/^@/, '').trim().toLowerCase();

function FollowButton({ profile, className = '', onError }) {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const viewerDisplayName = useMemo(() => {
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();
    return fullName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User';
  }, [user]);

  const viewerUsername = useMemo(() => {
    return user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'user';
  }, [user]);

  const profileUsername = profile?.username || profile?.handle || '';
  const profileUsernameKey = normalizeUsername(profileUsername);
  const viewerUsernameKey = normalizeUsername(viewerUsername);
  const isOwnProfile = Boolean(
    user?.id &&
      ((profile?.userId && profile.userId === user.id) || profileUsernameKey === viewerUsernameKey)
  );

  useEffect(() => {
    if (!db || !user?.id || !profileUsernameKey || isOwnProfile) {
      setIsFollowing(false);
      return undefined;
    }

    const unsubscribe = db
      .collection('users')
      .doc(user.id)
      .collection('following')
      .doc(profileUsernameKey)
      .onSnapshot(
        (doc) => {
          setIsFollowing(doc.exists);
        },
        (err) => {
          if (onError) onError(err.message);
        }
      );

    return () => unsubscribe();
  }, [isOwnProfile, onError, profileUsernameKey, user?.id]);

  const handleFollowToggle = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!db || !user?.id || !profileUsernameKey || isOwnProfile || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    if (onError) onError(null);

    const followingRef = db
      .collection('users')
      .doc(user.id)
      .collection('following')
      .doc(profileUsernameKey);

    const followerRef = profile?.userId
      ? db.collection('users').doc(profile.userId).collection('followers').doc(user.id)
      : null;

    try {
      if (isFollowing) {
        await Promise.all([
          followingRef.delete(),
          followerRef ? followerRef.delete() : Promise.resolve(),
        ]);
      } else {
        const followedProfile = {
          userId: profile?.userId || '',
          displayName: profile?.displayName || profile?.name || profileUsername || 'User',
          username: profileUsername,
          avatar: profile?.avatar || '',
          followedAt: serverTimestamp(),
        };

        const followerProfile = {
          userId: user.id,
          displayName: viewerDisplayName,
          username: viewerUsername,
          avatar: user?.imageUrl || '',
          followedAt: serverTimestamp(),
        };

        await Promise.all([
          followingRef.set(followedProfile),
          followerRef ? followerRef.set(followerProfile) : Promise.resolve(),
        ]);
      }
    } catch (err) {
      if (onError) onError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profileUsernameKey || isOwnProfile) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleFollowToggle}
      disabled={!db || !user?.id || isSubmitting}
      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold transition ${
        isFollowing
          ? 'border-[#cfd9de] bg-white text-[#0f1419] hover:border-red-200 hover:bg-red-50 hover:text-red-600'
          : 'border-[#0f1419] bg-[#0f1419] text-white hover:bg-[#272c30]'
      } ${!db || !user?.id || isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}
    >
      {isSubmitting ? 'Saving...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}

export default FollowButton;
