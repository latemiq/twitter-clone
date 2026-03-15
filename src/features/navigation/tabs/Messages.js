import React from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

function Messages() {
  const navigate = useNavigate();
  return (

    <div className="flex flex-1 h-screen bg-white overflow-hidden border-x border-[#eff3f4]">
      

      <div className="flex-[0.4] min-w-[380px] border-r border-[#eff3f4] flex flex-col">

        <div className="p-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h1 className="text-xl font-bold text-[#0f1419]">Messages</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate('/settings')}
              aria-label="Open settings"
              className="p-2 hover:bg-gray-200 rounded-full cursor-pointer transition bg-transparent border-none"
            >
              <SettingsOutlinedIcon className="!text-[20px]" />
            </button>
            <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer transition">
               <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2V5.5c0-.276-.224-.5-.5-.5H4.498c-.276 0-.5.224-.5.5V18.5c0 .276.224.5.5.5h6.502v2h-6.502c-1.381 0-2.5-1.119-2.5-2.5V5.5zm18 12V15h2v2.5c0 .276.224.5.5.5H25v2h-2.5c-.276 0-.5.224-.5.5V23h-2v-2.5c0-.276-.224-.5-.5-.5H17v-2h2.5c.276 0 .5-.224.5-.5zM3.998 8.265l8 3.637 8-3.637V5.5c0-.276-.224-.5-.5-.5H4.498c-.276 0-.5.224-.5.5v2.765zm16 1.47l-8 3.637-8-3.637v1.47l8 3.637 8-3.637v-1.47z"></path></svg>
            </div>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center gap-3 bg-[#eff3f4] px-4 py-2 rounded-full border border-transparent focus-within:bg-white focus-within:border-[#1d9bf0] transition group">
            <SearchIcon className="text-[#536471] group-focus-within:text-[#1d9bf0] !text-[18px]" />
            <input 
              type="text" 
              placeholder="Search Direct Messages" 
              className="bg-transparent outline-none text-[15px] w-full placeholder:text-[#536471]"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-10 text-center">
          <h2 className="text-3xl font-extrabold mb-2">Welcome to your inbox!</h2>
          <p className="text-[#536471] text-[15px] mb-6">
            Drop a line, share Tweets and more with private conversations between you and others on X.
          </p>
          <button className="bg-[#1d9bf0] text-white px-8 py-3 rounded-full font-bold text-[16px] hover:bg-[#1a8cd8] transition">
            Write a message
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        
        <div className="h-[53px] px-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#eff3f4] z-10">
          <div className="flex flex-col">
            <span className="font-bold text-[18px] leading-tight">John Kowal</span>
          </div>
          <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer transition">
            <MoreHorizIcon />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col items-center pt-10 px-4">
          <div className="w-[64px] h-[64px] bg-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border border-[#eff3f4] mb-2">
            J
          </div>
          <h3 className="font-bold text-[16px]">John Kowal</h3>
          <p className="text-[#536471] text-[14px]">@johnyykowal</p>
          <p className="text-[#536471] text-[14px] mt-3">Joined February 2026</p>
          
          <button className="mt-4 border border-[#cfd9de] px-4 py-1.5 rounded-full font-bold text-[14px] hover:bg-gray-100 transition">
            View Profile
          </button>

          <div className="w-full border-b border-[#eff3f4] my-10" />
        </div>


        <div className="p-2 border-t border-[#eff3f4] flex items-center gap-1">
          <div className="flex items-center gap-1 px-2">
        
             <span className="p-2 text-[#1d9bf0] hover:bg-[#e8f5fe] rounded-full cursor-pointer transition">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></svg>
             </span>
             <span className="p-2 text-[#1d9bf0] hover:bg-[#e8f5fe] rounded-full cursor-pointer transition">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 10.5V8.8h-4.4v6.4h1.7v-2.5H18v-1.7h-1.7v-1.5H19zM12.5 15.2h-1.7v-6.4h1.7v6.4zm-3.4-6.4H4.8v6.4h4.4v-3.3H7.5v1.7H6.5v-3.1h2.6v-1.7z"></path></svg>
             </span>
             <span className="p-2 text-[#1d9bf0] hover:bg-[#e8f5fe] rounded-full cursor-pointer transition">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM15.5 11c.828 0 1.5-.672 1.5-1.5S16.328 8 15.5 8 14 8.672 14 9.5s.672 1.5 1.5 1.5zm-7 0c.828 0 1.5-.672 1.5-1.5S9.328 8 8.5 8 7 8.672 7 9.5s.672 1.5 1.5 1.5zM12 15.5c-1.921 0-3.515-1.036-4.244-2.5h8.488c-.729 1.464-2.323 2.5-4.244 2.5z"></path></svg>
             </span>
          </div>

          <div className="flex-1 bg-[#eff3f4] rounded-2xl px-4 py-2 flex items-center">
            <input 
              type="text" 
              placeholder="Start a new message" 
              className="bg-transparent outline-none w-full text-[15px]"
            />
          </div>

          <button className="p-2 text-[#1d9bf0] hover:bg-[#e8f5fe] rounded-full transition ml-1">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.249 12 2.504 21.866zM5.981 13c.072 1.962.34 3.833.583 5.183L17.564 12 6.564 5.817c-.243 1.35-.511 3.221-.583 5.183H12v2H5.981z"></path></svg>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Messages;
