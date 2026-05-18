import React from 'react';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );

    return () => unsubscribe();
  }, []);

  return (
    <div className='feed border-r-[1px] border-twitter-background min-w-fit overflow-y-scroll'>
      <div className='feed__header sticky top-0 bg-white z-100 border-[1px] border-twitter-background p-[15px 20px]'>
        <div className='feed__headerTitle flex items-center justify-center gap-[30%]'>
          <div className='flex items-center gap-[10px]'>
            <h2 className='text-[20px] font-[calibri] font-extrabold'>For you</h2>
          </div>
          <div className='flex items-center gap-[10px]'>
            <h2 className='text-[20px] font-[calibri] font-extrabold'>Following</h2>
          </div>
        </div>
      </div>
      <TweetBox />
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

export default Home;
