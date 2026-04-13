import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AddIcon from '@mui/icons-material/Add';
import PublicIcon from '@mui/icons-material/Public';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate } from 'react-router-dom';

const communityTabs = ['Discover', 'Joined'];

const communities = [
  {
    name: 'Tech Makers',
    members: '48.2K',
    category: 'Technology',
    description: 'Build, ship, and compare notes with people making products on the web.',
    Icon: CodeIcon,
    cover: 'linear-gradient(135deg, #0f1419 0%, #1d9bf0 100%)',
    joined: true,
  },
  {
    name: 'Design Circle',
    members: '23.7K',
    category: 'Design',
    description: 'Share layouts, interface details, type choices, and useful critiques.',
    Icon: BrushIcon,
    cover: 'linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)',
    joined: false,
  },
  {
    name: 'Hoops Daily',
    members: '81.4K',
    category: 'Sports',
    description: 'Game reactions, trade talk, highlights, and every fourth quarter meltdown.',
    Icon: SportsBasketballIcon,
    cover: 'linear-gradient(135deg, #16a34a 0%, #0ea5e9 100%)',
    joined: false,
  },
  {
    name: 'Indie Music Room',
    members: '18.9K',
    category: 'Music',
    description: 'New releases, small venues, playlists, and artists worth hearing early.',
    Icon: MusicNoteIcon,
    cover: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    joined: true,
  },
];

const topics = ['React', 'Startups', 'Basketball', 'Design systems', 'New music', 'AI tools'];

function CommunityCard({ community }) {
  const { Icon } = community;

  return (
    <article className="border-b border-[#eff3f4] px-4 py-4 hover:bg-[#f7f9f9] transition">
      <div className="flex gap-3">
        <div
          className="h-[72px] w-[72px] shrink-0 rounded-2xl flex items-center justify-center text-white overflow-hidden"
          style={{ background: community.cover }}
        >
          <Icon className="!text-[34px]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-bold text-[16px] leading-5 truncate">{community.name}</h3>
              <p className="text-[#536471] text-[14px] leading-5">
                {community.members} members
              </p>
            </div>
            <button
              type="button"
              className={`shrink-0 px-4 py-1.5 rounded-full text-[14px] font-bold border transition ${community.joined
                ? 'border-[#cfd9de] text-[#0f1419] hover:bg-[#eff3f4]'
                : 'border-[#0f1419] bg-[#0f1419] text-white hover:bg-[#272c30]'
                }`}
            >
              {community.joined ? 'Joined' : 'Join'}
            </button>
          </div>

          <p className="mt-2 text-[15px] leading-5 text-[#0f1419]">{community.description}</p>

          <div className="mt-3 flex items-center gap-2 text-[#536471] text-[13px]">
            <PublicIcon className="!text-[17px]" />
            <span>{community.category}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Communities() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(communityTabs[0]);
  const visibleCommunities = activeTab === 'Joined'
    ? communities.filter((community) => community.joined)
    : communities;

  return (
    <div className="flex-[0.5] min-w-[600px] border-r border-[#eff3f4] h-screen bg-white text-[#0f1419] overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex justify-between items-center px-4 py-3">
          <div>
            <h2 className="text-xl font-bold leading-6">Communities</h2>
            <p className="text-[#536471] text-[13px] leading-4">@Johnny</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Create community"
              className="p-2 hover:bg-gray-200 rounded-full transition bg-transparent border-none"
            >
              <AddIcon />
            </button>
            <button
              type="button"
              onClick={() => navigate('/settings')}
              aria-label="Open settings"
              className="p-2 hover:bg-gray-200 rounded-full transition bg-transparent border-none"
            >
              <SettingsOutlinedIcon />
            </button>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-3 bg-[#eff3f4] px-4 py-2 rounded-full border border-transparent focus-within:bg-white focus-within:border-[#1d9bf0] transition group">
            <SearchIcon className="text-[#536471] group-focus-within:text-[#1d9bf0] !text-[18px]" />
            <input
              type="text"
              placeholder="Search Communities"
              className="bg-transparent outline-none text-[15px] w-full placeholder:text-[#536471]"
            />
          </div>
        </div>

        <div className="flex border-b border-[#eff3f4]">
          {communityTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab)}
                className="flex-1 hover:bg-gray-200 transition h-[53px] flex items-center justify-center relative cursor-pointer bg-transparent border-none p-0"
              >
                <span className={`text-[15px] ${isActive ? 'font-bold text-[#0f1419]' : 'font-medium text-[#536471]'}`}>
                  {tab}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-14 h-1 bg-[#1d9bf0] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <section className="px-4 py-5 border-b border-[#eff3f4]">
        <div className="rounded-lg border border-[#eff3f4] bg-[#f7f9f9] p-4">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-lg bg-[#1d9bf0] text-white flex items-center justify-center">
              <Groups2OutlinedIcon />
            </div>
            <div>
              <h3 className="text-[20px] font-extrabold leading-6">Find your crowd</h3>
              <p className="mt-1 text-[15px] leading-5 text-[#536471]">
                Join focused conversations and keep up with posts from people who care about the same topics.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                className="rounded-full border border-[#cfd9de] bg-white px-3 py-1.5 text-[14px] font-semibold text-[#0f1419] hover:bg-[#eff3f4] transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="px-4 pt-4 pb-2">
        <h3 className="text-xl font-extrabold">
          {activeTab === 'Joined' ? 'Your Communities' : 'Discover Communities'}
        </h3>
        <p className="text-[#536471] text-[15px] leading-5 mt-1">
          {activeTab === 'Joined'
            ? 'Communities you have joined are collected here.'
            : 'Browse active spaces and join the conversations that fit your timeline.'}
        </p>
      </div>

      <div>
        {visibleCommunities.map((community) => (
          <CommunityCard key={community.name} community={community} />
        ))}
      </div>
    </div>
  );
}

export default Communities;
