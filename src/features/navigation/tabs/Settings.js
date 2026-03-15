import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

const settingsSections = [
  {
    title: 'Your account',
    description: 'See information about your account, download an archive of your data, or learn about your account deactivation options.',
  },
  {
    title: 'Security and account access',
    description: 'Manage your password, two-factor authentication, and connected apps.',
  },
  {
    title: 'Privacy and safety',
    description: 'Control what information you share and what content you want to see on X.',
  },
  {
    title: 'Notifications',
    description: 'Choose the kinds of notifications you get about activity, interests, and recommendations.',
  },
  {
    title: 'Accessibility, display, and languages',
    description: 'Adjust how X looks and works for you across the app.',
  },
];

function Settings() {
  return (
    <div className="flex-[0.5] min-w-[600px] max-w-[680px] border-r border-[#eff3f4] h-screen bg-white text-[#0f1419] overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-[#eff3f4]">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold">Settings</h2>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-3 bg-[#eff3f4] px-4 py-2 rounded-full border border-transparent focus-within:bg-white focus-within:border-[#1d9bf0] transition group">
            <SearchIcon className="text-[#536471] group-focus-within:text-[#1d9bf0] !text-[18px]" />
            <input
              type="text"
              placeholder="Search settings"
              className="bg-transparent outline-none text-[15px] w-full text-[#0f1419] placeholder:text-[#536471]"
            />
          </div>
        </div>
      </div>

      <div className="py-2">
        {settingsSections.map((section) => (
          <button
            key={section.title}
            type="button"
            className="w-full flex items-start justify-between gap-4 px-4 py-4 text-left hover:bg-gray-50 transition border-b border-[#eff3f4]"
          >
            <div>
              <h3 className="text-[15px] font-bold">{section.title}</h3>
              <p className="mt-1 text-[14px] leading-5 text-[#536471]">{section.description}</p>
            </div>
            <ChevronRightIcon className="text-[#536471] mt-1 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Settings;
