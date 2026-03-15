import React from 'react';
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const exploreTabs = ["For You", "Trending", "News", "Sports", "Entertainment"];

const exploreContentByTab = {
  "For You": {
    storiesTitle: "Today's News",
    stories: [
      {
        title: "Tight Three-Way Race Heats Up Gorton and Denton By-Election",
        meta: "1 day ago - News - 197K posts",
        avatars: ["bg-blue-400", "bg-red-400", "bg-yellow-400"]
      },
      {
        title: "NYC Mayor's Snow Shoveler Call Draws ID Requirement Mockery Amid Blizzard Prep",
        meta: "2 days ago - Other - 400K posts",
        avatars: ["bg-pink-400", "bg-gray-400"]
      },
      {
        title: "BLACKPINK Becomes First Music Artist to Hit 100 Million YouTube Subscribers",
        meta: "2 days ago - Entertainment - 268K posts",
        avatars: ["bg-black", "bg-pink-500"]
      }
    ],
    trendsRegion: "Trending in Poland",
    trends: ["#jakgractoznajlepszymi", "Hindusi", "#ARKGKS", "Chinczykom", "Justyna", "Swiety"],
    followsTitle: "Who to follow",
    follows: [
      {
        name: "Biuro Bezpieczenstwa Narodowego | BBN",
        handle: "@BBN_PL",
        bio: "Biuro Bezpieczenstwa Narodowego | National Security Bureau of the Republic of Poland",
        avatarClass: "bg-[#0f1419]",
        avatarText: "BBN",
        verified: true
      },
      {
        name: "Donald J. Trump",
        handle: "@realDonaldTrump",
        bio: "45th & 47th President of the United States of America",
        avatarClass: "bg-blue-800",
        verified: true,
        mutual: "Elon Musk follows"
      },
      {
        name: "CNN Breaking News",
        handle: "@cnnbrk",
        bio: "Breaking news from CNN Digital. Check @cnn for all things CNN, breaking and more.",
        avatarClass: "bg-red-600",
        avatarText: "CNN",
        verified: true
      }
    ]
  },
  Trending: {
    storiesTitle: "What's trending now",
    stories: [
      {
        title: "AI-first laptops drive a new cycle of hardware upgrades",
        meta: "6 hours ago - Technology - 152K posts",
        avatars: ["bg-indigo-500", "bg-cyan-500"]
      },
      {
        title: "Budget airlines spark fare war before the summer season",
        meta: "8 hours ago - Business - 74K posts",
        avatars: ["bg-orange-400", "bg-teal-500"]
      },
      {
        title: "City nightlife rebounds as new venues fill weekend calendars",
        meta: "12 hours ago - Lifestyle - 95K posts",
        avatars: ["bg-fuchsia-500", "bg-purple-500"]
      }
    ],
    trendsRegion: "Trending worldwide",
    trends: ["#AI", "#OpenSource", "#Euro2028", "#Nintendo", "#OscarBuzz", "#SpaceX"],
    followsTitle: "Popular right now",
    follows: [
      {
        name: "TechCrunch",
        handle: "@TechCrunch",
        bio: "Technology news and analysis, from startups to big tech.",
        avatarClass: "bg-green-700",
        avatarText: "TC",
        verified: true
      },
      {
        name: "Formula 1",
        handle: "@F1",
        bio: "The official home of F1 on X.",
        avatarClass: "bg-red-700",
        avatarText: "F1",
        verified: true
      },
      {
        name: "Pop Crave",
        handle: "@PopCrave",
        bio: "Your source for music, TV and pop culture moments.",
        avatarClass: "bg-pink-600",
        avatarText: "PC",
        verified: true
      }
    ]
  },
  News: {
    storiesTitle: "Latest headlines",
    stories: [
      {
        title: "Leaders agree on emergency aid package after overnight talks",
        meta: "2 hours ago - World News - 218K posts",
        avatars: ["bg-slate-500", "bg-blue-500", "bg-amber-500"]
      },
      {
        title: "Central bank signals slower cuts as inflation cools unevenly",
        meta: "5 hours ago - Economy - 131K posts",
        avatars: ["bg-emerald-500", "bg-gray-500"]
      },
      {
        title: "Major storm moves east, schools in multiple states closed",
        meta: "7 hours ago - Weather - 89K posts",
        avatars: ["bg-sky-500", "bg-indigo-400"]
      }
    ],
    trendsRegion: "News trends",
    trends: ["#Elections2026", "#ClimateSummit", "#Breaking", "#Policy", "#Markets", "#Education"],
    followsTitle: "Follow trusted news",
    follows: [
      {
        name: "Reuters",
        handle: "@Reuters",
        bio: "Top and breaking news around the world.",
        avatarClass: "bg-orange-600",
        avatarText: "R",
        verified: true
      },
      {
        name: "AP News",
        handle: "@AP",
        bio: "News from The Associated Press.",
        avatarClass: "bg-blue-900",
        avatarText: "AP",
        verified: true
      },
      {
        name: "BBC Breaking News",
        handle: "@BBCBreaking",
        bio: "Breaking news alerts and updates.",
        avatarClass: "bg-red-800",
        avatarText: "BBC",
        verified: true
      }
    ]
  },
  Sports: {
    storiesTitle: "Live sports",
    stories: [
      {
        title: "Late comeback sends underdogs into the cup semifinals",
        meta: "1 hour ago - Football - 167K posts",
        avatars: ["bg-lime-500", "bg-green-700"]
      },
      {
        title: "Rookie scores career-high in thriller that goes to overtime",
        meta: "3 hours ago - Basketball - 112K posts",
        avatars: ["bg-orange-500", "bg-red-500"]
      },
      {
        title: "Pole position battle heats up ahead of season opener",
        meta: "4 hours ago - Motorsport - 104K posts",
        avatars: ["bg-zinc-800", "bg-rose-500"]
      }
    ],
    trendsRegion: "Trending in sports",
    trends: ["#UCL", "#NBA", "#F1", "#Wimbledon", "#NFLDraft", "#MotoGP"],
    followsTitle: "Athletes and leagues",
    follows: [
      {
        name: "ESPN",
        handle: "@espn",
        bio: "Serving sports fans everywhere.",
        avatarClass: "bg-red-700",
        avatarText: "ESPN",
        verified: true
      },
      {
        name: "Fabrizio Romano",
        handle: "@FabrizioRomano",
        bio: "Football transfer news and updates.",
        avatarClass: "bg-sky-700",
        avatarText: "FR",
        verified: true
      },
      {
        name: "UEFA Champions League",
        handle: "@ChampionsLeague",
        bio: "The official UEFA Champions League account.",
        avatarClass: "bg-indigo-900",
        avatarText: "UCL",
        verified: true
      }
    ]
  },
  Entertainment: {
    storiesTitle: "Entertainment spotlight",
    stories: [
      {
        title: "Award season frontrunner surprises fans with new trailer drop",
        meta: "2 hours ago - Movies - 145K posts",
        avatars: ["bg-yellow-500", "bg-black"]
      },
      {
        title: "Festival lineup reveals major comeback performance",
        meta: "5 hours ago - Music - 176K posts",
        avatars: ["bg-pink-500", "bg-purple-600"]
      },
      {
        title: "Streaming hit renewed for a final season",
        meta: "9 hours ago - TV - 98K posts",
        avatars: ["bg-red-500", "bg-neutral-800"]
      }
    ],
    trendsRegion: "Trending in entertainment",
    trends: ["#Oscars", "#KPop", "#Streaming", "#BoxOffice", "#CelebStyle", "#NewMusicFriday"],
    followsTitle: "Creators and brands",
    follows: [
      {
        name: "Netflix",
        handle: "@netflix",
        bio: "Here to help you find your next watch.",
        avatarClass: "bg-red-700",
        avatarText: "N",
        verified: true
      },
      {
        name: "A24",
        handle: "@A24",
        bio: "Films, television and whatever comes next.",
        avatarClass: "bg-black",
        avatarText: "A24",
        verified: true
      },
      {
        name: "billboard",
        handle: "@billboard",
        bio: "Music charts, news and culture.",
        avatarClass: "bg-cyan-700",
        avatarText: "BB",
        verified: true
      }
    ]
  }
};

function Explore() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(exploreTabs[0]);
  const currentContent = exploreContentByTab[activeTab];

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
          <button
            type="button"
            onClick={() => navigate('/settings')}
            aria-label="Open settings"
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition bg-transparent border-none"
          >
            <SettingsOutlinedIcon className="text-[#0f1419]" />
          </button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar mt-1">
          {exploreTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab)}
                className="flex-1 min-w-max text-center hover:bg-gray-100 cursor-pointer transition relative bg-transparent border-none p-0"
              >
                <div className="py-4 px-4 inline-block relative">
                  <span className={`text-[15px] ${isActive ? "font-bold text-[#0f1419]" : "font-medium text-[#536471]"}`}>
                    {tab}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#1d9bf0] rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#eff3f4] pb-2">
        <h2 className="text-[20px] font-extrabold px-4 py-3">{currentContent.storiesTitle}</h2>

        {currentContent.stories.map((story) => (
          <div key={`${story.title}-${story.meta}`} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition">
            <h3 className="font-bold text-[15px] leading-snug">{story.title}</h3>
            <div className="flex items-center gap-2 mt-1 text-[#536471] text-[13px]">
              <div className="flex -space-x-1.5">
                {story.avatars.map((avatarColor, index) => (
                  <div
                    key={`${story.title}-${avatarColor}-${index}`}
                    className={`w-4 h-4 rounded-full ${avatarColor} border border-white`}
                  ></div>
                ))}
              </div>
              <span>{story.meta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-[#eff3f4] py-2">
        {currentContent.trends.map((trend) => (
          <div key={trend} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition flex justify-between items-start group">
            <div>
              <p className="text-[#536471] text-[13px]">{currentContent.trendsRegion}</p>
              <p className="font-bold text-[15px] mt-0.5">{trend}</p>
            </div>
            <div className="p-2 -mr-2 text-[#536471] group-hover:text-[#1d9bf0] hover:bg-[#1d9bf01a] rounded-full transition">
              <MoreHorizIcon />
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-[#eff3f4]">
        <h2 className="text-[20px] font-extrabold px-4 py-3">{currentContent.followsTitle}</h2>

        {currentContent.follows.map((account) => (
          <div key={account.handle} className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition flex justify-between">
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-full ${account.avatarClass} flex-shrink-0 flex justify-center items-center text-white text-xs font-bold`}>
                {account.avatarText || ""}
              </div>
              <div className="flex flex-col">
                {account.mutual && (
                  <div className="flex items-center gap-1 text-[#536471] text-[13px] font-medium">
                    <PersonIcon className="!text-[14px]" />
                    <span>{account.mutual}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[15px] hover:underline">{account.name}</span>
                  {account.verified && <VerifiedIcon className="text-[#1d9bf0] !text-[18px]" />}
                </div>
                <span className="text-[#536471] text-[15px]">{account.handle}</span>
                <p className="text-[15px] mt-1 text-[#0f1419] leading-snug">{account.bio}</p>
              </div>
            </div>
            <button className="h-8 !bg-[var(--twiter-color)] text-white font-bold text-[14px] px-4 rounded-full hover:bg-[#272c30] transition ml-2 whitespace-nowrap">
              Follow
            </button>
          </div>
        ))}


        <div className="px-4 py-4 hover:bg-gray-100 cursor-pointer transition rounded-b-xl">
          <span className="text-[#1d9bf0] text-[15px]">Show more</span>
        </div>
      </div>
      <div className="h-20 bg-white"></div>
    </div>
  );
}

export default Explore;
