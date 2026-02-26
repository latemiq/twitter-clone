import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarOption from './SidebarOption';
import Button from '@mui/material/Button';
import TagIcon from '@mui/icons-material/Tag';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const moreItems = [
  { to: '/lists', text: 'Lists', Icon: ListAltIcon },
  { to: '/communities', text: 'Communities', Icon: Groups2OutlinedIcon },
  { to: '/business', text: 'Business', Icon: BusinessCenterOutlinedIcon },
  { to: '/ads', text: 'Ads', Icon: CampaignOutlinedIcon },
  { to: '/create-space', text: 'Create your Space', Icon: KeyboardVoiceOutlinedIcon },
  { to: '/settings-privacy', text: 'Setting and privacy', Icon: SettingsOutlinedIcon },
];

function SidebarDropdownItem({ to, text, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-[15px] transition-colors duration-200 hover:bg-[#f7f9f9] ${isActive ? 'text-[var(--twiter-color)] font-semibold' : 'text-gray-900'
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span>{text}</span>
    </NavLink>
  );
}

function Sidebar() {
  const [isMoreOpen, setIsMoreOpen] = React.useState(false);
  const moreMenuRef = React.useRef(null);
  const location = useLocation();

  const isMoreActive = React.useMemo(
    () => moreItems.some((item) => location.pathname.startsWith(item.to)),
    [location.pathname]
  );

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  return (
    <div className='sidebar border-r-[1px] border-twitter-background mt-[20px]'>
      <TwitterIcon className='sidebar__twitterIcon color-twitter-color text-[30px] ml-[20px] mb-[20px]' />

      <SidebarOption to="/home" text="Home" Icon={HomeIcon} />
      <SidebarOption to="/explore" text="Explore" Icon={TagIcon} />
      <SidebarOption to="/notifications" text="Notifications" Icon={NotificationsNoneIcon} />
      <SidebarOption to="/messages" text="Messages" Icon={MailOutlineIcon} />
      <SidebarOption to="/bookmarks" text="Bookmarks" Icon={BookmarkBorderIcon} />
      <SidebarOption to="/lists" text="Lists" Icon={ListAltIcon} />
      <SidebarOption to="/profile" text="Profile" Icon={PermIdentityIcon} />

      <div className='relative w-fit' ref={moreMenuRef}>
        <button
          type='button'
          aria-expanded={isMoreOpen}
          aria-haspopup='menu'
          onClick={() => setIsMoreOpen((prev) => !prev)}
          className={`flex items-center cursor-pointer p-3 rounded-full w-fit transition-all duration-200 hover:bg-[#e8f5fe] hover:text-[var(--twiter-color)] ${isMoreOpen || isMoreActive ? 'text-[var(--twiter-color)]' : 'text-gray-900'
            }`}
        >
          <MoreHorizIcon className="h-7 w-7" />
          <h2 className="hidden xl:block font-bold text-xl ml-4 mr-4">More</h2>
        </button>

        {isMoreOpen && (
          <div className='absolute left-0 mt-2 min-w-[230px] overflow-hidden rounded-2xl border border-twitter-background bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-50'>
            {moreItems.map((item) => (
              <SidebarDropdownItem
                key={item.to}
                to={item.to}
                text={item.text}
                Icon={item.Icon}
              />
            ))}
          </div>
        )}
      </div>

      <Button variant="outlined" className="sidebar__tweet !bg-[var(--twiter-color)]!border-none!text-white!font-[900]![text-transform:inherit]!rounded-[30px]h-[50px]!mt-[20px]" fullWidth>Tweet</Button>
    </div>
  )
}

export default Sidebar
