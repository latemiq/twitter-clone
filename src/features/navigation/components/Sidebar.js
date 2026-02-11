import * as React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import Button from '@mui/material/Button';
import TagIcon from '@mui/icons-material/Tag';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Sidebar() {
  return (
    <div className='sidebar border-r-[1px] border-twitter-background flex-[0.3] min-w-[250px] mt-[20px] pl-[20px] pr-[20px]'>
      {/* Twitter icon */}
      <TwitterIcon className='sidebar__twitterIcon color-twitter-color text-[30px] ml-[20px] mb-[20px]'/>
      <SidebarOption text="Home" Icon={HomeIcon} />
      <SidebarOption text="Explore" Icon={TagIcon} />
      <SidebarOption text="Notifications" Icon={NotificationsNoneIcon} />
      <SidebarOption text="Messages" Icon={MailOutlineIcon} />
      <SidebarOption text="Bookmarks" Icon={BookmarkBorderIcon} />
      <SidebarOption text="Lists" Icon={ListAltIcon} />
      <SidebarOption text="Profile" Icon={PermIdentityIcon} />
      <SidebarOption text="More" Icon={MoreHorizIcon} />
      {/* SidebarOption */}
      <Button variant="outlined" className="sidebar__tweet !bg-[var(--twiter-color)]!border-none!text-white!font-[900]![text-transform:inherit]!rounded-[30px]h-[50px]!mt-[20px]" fullWidth>Tweet</Button>
      {/* Button -> Tweet */}
    </div>
  )
}

export default Sidebar
