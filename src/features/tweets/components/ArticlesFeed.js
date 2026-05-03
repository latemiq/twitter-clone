import React from 'react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

function ArticlesFeed() {
  return (
    <div className="px-8 py-10 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e8f5fd] text-[#1d9bf0]">
        <ArticleOutlinedIcon fontSize="large" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-[#0f1419]">No articles yet</h3>
      <p className="mx-auto mt-2 max-w-[360px] text-sm leading-6 text-[#536471]">
        When you publish long-form posts, they will show up here.
      </p>
    </div>
  );
}

export default ArticlesFeed;
