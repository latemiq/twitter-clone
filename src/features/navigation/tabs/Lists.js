import React from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Lists() {
  return <div className="flex-[0.5] min-w-[600px] border-r border-[#eff3f4] h-screen bg-white text-[#0f1419] overflow-y-auto">

    <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 cursor-pointer">
      <div className="flex justify-between items-center px-4 py-3">
        <h2 className="text-xl font-bold">Notifications</h2>
        <div className="p-2 hover:bg-gray-200 rounded-full transition">
          <SettingsOutlinedIcon />
        </div>
      </div>

      <div className="flex border-b border-[#eff3f4]">
        <div className="flex-1 hover:bg-gray-200 transition h-[53px] flex items-center justify-center relative cursor-pointer">
          <span className="font-bold text-[15px]">Other</span>
          <div className="absolute bottom-0 w-14 h-1 bg-[#1d9bf0] rounded-full"></div>
        </div>
        <div className="flex-1 hover:bg-gray-200 transition h-[53px] flex items-center justify-center cursor-pointer">
          <span className="font-medium text-[15px] text-[#536471]">Subscribed</span>
        </div>
        <div className="flex-1 hover:bg-gray-200 transition h-[53px] flex items-center justify-center cursor-pointer">
          <span className="font-medium text-[15px] text-[#536471]">Member</span>
        </div>
      </div>
    </div>
    <div className="px-8 mt-10">
      <div className="max-w-[400px]">
        <h2 className="text-[31px] font-extrabold leading-tight mb-2">
          You haven't created any Lists — yet
        </h2>
        <p className="text-[#536471] text-[15px] leading-5">
          When you do, it'll show up here.
        </p>
      </div>
    </div>
    <div className="flex justify-center mt-10">
      <button className="bg-[#1d9bf0] text-white px-4 py-2 rounded-full mt-6 hover:bg-[#1a8cd8] transition">
        Create a List
      </button>
    </div>
  </div>
}

export default Lists;
