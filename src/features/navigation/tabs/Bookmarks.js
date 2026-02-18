import React from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function Bookmarks() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden border-x border-gray-800">

      <div className='flex items-center gap-6 px-4 py-3'>
        <div className="cursor-pointer">
          <ArrowBackIcon onClick={() => navigate("/home")} />
        </div>
        <div className="flex flex-col">
            <h1 className='text-xl font-bold leading-5'>Bookmarks</h1>
            <span className="text-xs text-gray-500">@Johnny</span>
        </div>
      </div>

      <div className="px-4 py-1">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-700 focus-within:border-[#1d9bf0] transition group">
          <SearchIcon className="text-[#71767b] group-focus-within:text-[#1d9bf0] !text-[18px]" />
          <input
            type="text"
            placeholder="Search Bookmarks"
            className="bg-transparent outline-none text-[15px] w-full text-white placeholder:text-[#71767b]"
          />
        </div>
      </div>

    </div>
  );
}

export default Bookmarks;
