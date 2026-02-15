import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

function Profile() {
  return (
    <div className="flex-[0.4] min-w-[620px] max-w-[700px] h-screen overflow-y-auto bg-white text-[#0f1419] border-x border-[#eff3f4]">

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#eff3f4]">
        <div className="flex items-center justify-between px-4 py-2">

          <div className="flex items-center gap-4 flex-1">
            <span className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-100 cursor-pointer">
              <ArrowBackIcon />
            </span>

            <div className="flex flex-col">
              <h1 className="text-[20px] font-bold">John Kowal</h1>
              <p className="text-[13px] text-[#536471]">0 posts</p>
            </div>
          </div>

          <span className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-100 cursor-pointer">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="h-[200px] bg-[#cfd9de] border-b border-[#eff3f4]" />
      <section className="relative px-6 pb-5">

        <div className="absolute -top-16 left-6 w-[130px] h-[130px] rounded-full bg-pink-500 border-4 border-white grid place-items-center text-white text-5xl font-semibold">
          J
        </div>
        <div className="flex justify-end pt-4">
          <button className="border border-[#cfd9de] px-5 py-2 rounded-full font-bold text-[15px] hover:bg-gray-100 transition">
            Edit profile
          </button>
        </div>
        <div className="h-16" />

        <h2 className="text-xl font-bold mt-4">John Kowal</h2>
        <p className="text-[#536471]">@johnyykowal</p>

        <div className="flex items-center gap-2 mt-3 text-[#536471] text-sm">
          <CalendarMonthOutlinedIcon fontSize="small" />
          <span>Joined February 2026</span>
          <ChevronRightIcon fontSize="small" />
        </div>

        <div className="flex gap-6 mt-3 text-sm">
          <div>
            <span className="font-bold">1</span>{" "}
            <span className="text-[#536471]">Following</span>
          </div>
          <div>
            <span className="font-bold">0</span>{" "}
            <span className="text-[#536471]">Followers</span>
          </div>
        </div>
      </section>


      <nav className="grid grid-cols-6 border-y border-[#eff3f4]">
        {tabs.map((tab, index) => {
          const isActive = index === 0;

          return (
            <div
              key={tab}
              className={`relative text-center py-4 text-[15px] font-semibold cursor-pointer transition
              ${isActive ? "text-[#0f1419]" : "text-[#536471] hover:bg-gray-100"}`}
            >
              {tab}

              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#1d9bf0] rounded-full" />
              )}
            </div>
          );
        })}
      </nav>

    </div>
  );
}

export default Profile;
