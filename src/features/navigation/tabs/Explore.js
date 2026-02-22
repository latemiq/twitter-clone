import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';

const trendingTopics = [
  "#jakgractoznajlepszymi",
  "Hindusi",
  "#ARKGKS",
  "Chińczykom",
  "Justyna",
  "Święty"
];

function Explore() {
  return (
    <div className="flex-[0.5] min-w-[600px] max-w-[600px] border-r border-[#eff3f4] bg-white h-screen overflow-y-auto text-[#0f1419]">
      
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 pt-2 border-b border-[#eff3f4]">
        <div className="flex items-center gap-4 px-4 pb-2">
          <div className="flex-1 flex items-center gap-3 bg-[#eff3f4] px-4 py-2 rounded-full border border-transparent focus-within:bg-white focus-within:border-[#1d9bf0] transition group">
            <SearchIcon className="text-[#536471] group-focus-within:text-[#1d9bf0] !text-[18px]" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-[15px] w-full text-[#0f1419] placeholder:text-[#536471]"
            />
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition">
            <SettingsOutlinedIcon className="text-[#0f1419]" />
          </div>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar mt-1">
          {["For You", "Trending", "News", "Sports", "Entertainment"].map((tab, index) => {
            const isActive = index === 0;
            return (
              <div key={tab} className="flex-1 min-w-max text-center hover:bg-gray-100 cursor-pointer transition relative">
                <div className="py-4 px-4 inline-block relative">
                  <span className={`text-[15px] ${isActive ? "font-bold text-[#0f1419]" : "font-medium text-[#536471]"}`}>
                    {tab}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#1d9bf0] rounded-full" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#eff3f4] pb-2">
        <h2 className="text-[20px] font-extrabold px-4 py-3">Today's News</h2>
        
        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">
          <h3 className="font-bold text-[15px] leading-snug">Tight Three-Way Race Heats Up Gorton and Denton By-Election</h3>
          <div className="flex items-center gap-2 mt-1 text-[#536471] text-[13px]">
            <div className="flex -space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-400 border border-white z-20"></div>
              <div className="w-4 h-4 rounded-full bg-red-400 border border-white z-10"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-400 border border-white z-0"></div>
            </div>
            <span>1 day ago · News · 197K posts</span>
          </div>
        </div>
        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">
          <h3 className="font-bold text-[15px] leading-snug">NYC Mayor's Snow Shoveler Call Draws ID Requirement Mockery Amid Blizzard Prep</h3>
          <div className="flex items-center gap-2 mt-1 text-[#536471] text-[13px]">
            <div className="flex -space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-pink-400 border border-white z-20"></div>
              <div className="w-4 h-4 rounded-full bg-gray-400 border border-white z-10"></div>
            </div>
            <span>2 days ago · Other · 400K posts</span>
          </div>
        </div>

        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">
          <h3 className="font-bold text-[15px] leading-snug">BLACKPINK Becomes First Music Artist to Hit 100 Million YouTube Subscribers</h3>
          <div className="flex items-center gap-2 mt-1 text-[#536471] text-[13px]">
            <div className="flex -space-x-1.5">
              <div className="w-4 h-4 rounded-full bg-black border border-white z-20"></div>
              <div className="w-4 h-4 rounded-full bg-pink-500 border border-white z-10"></div>
            </div>
            <span>2 days ago · Entertainment · 268K posts</span>
          </div>
        </div>
      </div>

      <div className="border-b border-[#eff3f4] py-2">
        {trendingTopics.map((trend) => (
          <div key={trend} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition flex justify-between items-start group">
            <div>
              <p className="text-[#536471] text-[13px]">Trending in Poland</p>
              <p className="font-bold text-[15px] mt-0.5">{trend}</p>
            </div>
            <div className="p-2 -mr-2 text-[#536471] group-hover:text-[#1d9bf0] hover:bg-[#1d9bf01a] rounded-full transition">
              <MoreHorizIcon />
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-[#eff3f4]">
        <h2 className="text-[20px] font-extrabold px-4 py-3">Who to follow</h2>

        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition flex justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0f1419] flex-shrink-0 flex justify-center items-center text-white text-xs font-bold">BBN</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[15px] hover:underline">Biuro Bezpieczeństwa Narodowego | BBN</span>
                <VerifiedIcon className="text-[#1d9bf0] !text-[18px]" />
              </div>
              <span className="text-[#536471] text-[15px]">@BBN_PL</span>
              <p className="text-[15px] mt-1 text-[#0f1419] leading-snug">
                Biuro Bezpieczeństwa Narodowego | National Security Bureau of the Republic of Poland
              </p>
            </div>
          </div>
          <button className="h-8 !bg-[var(--twiter-color)] text-white font-bold text-[14px] px-4 rounded-full hover:bg-[#272c30] transition ml-2 whitespace-nowrap">
            Follow
          </button>
        </div>
        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition flex justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-800 flex-shrink-0 mt-4"></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#536471] text-[13px] font-medium">
                <PersonIcon className="!text-[14px]" />
                <span>Elon Musk follows</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[15px] hover:underline">Donald J. Trump</span>
                <VerifiedIcon className="text-[#1d9bf0] !text-[18px]" />
              </div>
              <span className="text-[#536471] text-[15px]">@realDonaldTrump</span>
              <p className="text-[15px] mt-1 text-[#0f1419] leading-snug">
                45th & 47th President of the United States of America 🇺🇸
              </p>
            </div>
          </div>
          <button className="h-8 mt-4 !bg-[var(--twiter-color)] text-white font-bold text-[14px] px-4 rounded-full hover:bg-[#272c30] transition ml-2 whitespace-nowrap">
            Follow
          </button>
        </div>
        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition flex justify-between">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex-shrink-0 flex justify-center items-center text-white font-bold text-xs">CNN</div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[15px] hover:underline">CNN Breaking News</span>
                <VerifiedIcon className="text-[#1d9bf0] !text-[18px]" />
              </div>
              <span className="text-[#536471] text-[15px]">@cnnbrk</span>
              <p className="text-[15px] mt-1 text-[#0f1419] leading-snug">
                Breaking news from CNN Digital. Check @cnn for all things CNN, breaking and more.
              </p>
            </div>
          </div>
          <button className="h-8 !bg-[var(--twiter-color)] text-white font-bold text-[14px] px-4 rounded-full hover:bg-[#272c30] transition ml-2 whitespace-nowrap">
            Follow
          </button>
        </div>

        <div className="px-4 py-4 hover:bg-gray-100 cursor-pointer transition rounded-b-xl">
          <span className="text-[#1d9bf0] text-[15px]">Show more</span>
        </div>
      </div>
      <div className="h-20 bg-white"></div>
    </div>
  );
}

export default Explore;