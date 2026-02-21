import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function Widgets() {
  const trends = [
    { category: "Technology", topic: "#NextJS", posts: "18.4K posts" },
    { category: "Automotive", topic: "#Koenigsegg", posts: "9,221 posts" },
    { category: "Programming", topic: "#React", posts: "32.7K posts" },
  ];

  const suggestedAccounts = [
    { name: "Vercel", handle: "@vercel", url: "https://x.com/vercel" },
    { name: "React", handle: "@reactjs", url: "https://x.com/reactjs" },
    { name: "Next.js", handle: "@nextjs", url: "https://x.com/nextjs" },
  ];

  return (
    <div className="widgets hidden md:block font-bold text-xl ml-4 mr-4">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <div className="mt-4 space-y-4 text-sm font-normal">
          {trends.map((trend) => (
            <div key={trend.topic} className="cursor-pointer rounded-xl p-2 hover:bg-gray-100 transition-colors">
              <p className="text-xs text-gray-500">{trend.category} · Trending</p>
              <p className="font-semibold text-gray-900">{trend.topic}</p>
              <p className="text-xs text-gray-500">{trend.posts}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="widgets__widgetContainer">
        <h2>Who to follow</h2>
        <div className="mt-4 space-y-3 text-sm font-normal">
          {suggestedAccounts.map((account) => (
            <a
              key={account.handle}
              href={account.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl p-2 hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-900">{account.name}</p>
                <p className="text-xs text-gray-500">{account.handle}</p>
              </div>
              <span className="rounded-full bg-black px-3 py-1 text-xs text-white">Follow</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Widgets;
