import React from 'react';
import './SidebarOption.css';

function SidebarOption({ active, text, Icon }) {
  return (
    <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
        <Icon />
      <h2 className="hidden sm:block">{text}</h2>
    </div>
  )
}

export default SidebarOption
