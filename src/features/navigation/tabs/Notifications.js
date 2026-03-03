import React from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const notificationTabs = ["All", "Mentions"];

const notificationContentByTab = {
  All: {
    title: "Nothing to see here — yet",
    description: "From likes to reposts and a whole lot more, this is where all the action happens."
  },
  Mentions: {
    title: "No mentions yet",
    description: "When someone mentions you, you'll see it here."
  }
};

function Notifications() {
  const [activeTab, setActiveTab] = React.useState(notificationTabs[0]);
  const currentContent = notificationContentByTab[activeTab];

  return (
    <div className="flex-[0.5] min-w-[600px] border-r border-[#eff3f4] h-screen bg-white text-[#0f1419] overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 cursor-pointer">
        <div className="flex justify-between items-center px-4 py-3">
          <h2 className="text-xl font-bold">Notifications</h2>
          <div className="p-2 hover:bg-gray-200 rounded-full transition">
            <SettingsOutlinedIcon />
          </div>
        </div>

        <div className="flex border-b border-[#eff3f4]">
          {notificationTabs.map((tab) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab)}
                className="flex-1 hover:bg-gray-200 transition h-[53px] flex items-center justify-center relative cursor-pointer bg-transparent border-none p-0"
              >
                <span className={`text-[15px] ${isActive ? "font-bold text-[#0f1419]" : "font-medium text-[#536471]"}`}>
                  {tab}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-14 h-1 bg-[#1d9bf0] rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-8 mt-10">
        <div className="max-w-[400px]">
          <h2 className="text-[31px] font-extrabold leading-tight mb-2">
            {currentContent.title}
          </h2>
          <p className="text-[#536471] text-[15px] leading-5">
            {currentContent.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
