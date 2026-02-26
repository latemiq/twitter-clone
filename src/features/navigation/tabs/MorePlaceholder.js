import React from 'react';

function MorePlaceholder({ title }) {
  return (
    <div className="flex-[0.5] min-w-[600px] border-r border-[#eff3f4] h-screen bg-white text-[#0f1419] overflow-y-auto">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-[#eff3f4]">
        <div className="px-4 py-3">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>

      <div className="px-8 mt-10">
        <p className="text-[#536471] text-[15px] leading-5">This section is ready for content.</p>
      </div>
    </div>
  );
}

export default MorePlaceholder;
