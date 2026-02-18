import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarOption({ text, Icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center cursor-pointer p-3 rounded-full w-fit transition-all duration-200 hover:bg-[#e8f5fe] hover:text-[var(--twiter-color)] ${isActive ? 'text-[var(--twiter-color)]' : 'text-gray-900'}`
      }
    >
      <Icon className="h-7 w-7" />
      <h2 className="hidden xl:block font-bold text-xl ml-4 mr-4">{text}</h2>
    </NavLink>
  );
}

export default SidebarOption;
