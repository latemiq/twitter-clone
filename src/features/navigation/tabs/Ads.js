import React from 'react';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const campaignStats = [
  {
    label: 'Spend this month',
    value: '$18.2K',
    detail: '74% of budget',
    tone: 'text-emerald-600',
    Icon: PaidOutlinedIcon,
  },
  {
    label: 'Impressions',
    value: '2.4M',
    detail: '+18.6%',
    tone: 'text-sky-600',
    Icon: BarChartOutlinedIcon,
  },
  {
    label: 'Conversions',
    value: '8,412',
    detail: '+9.1%',
    tone: 'text-rose-600',
    Icon: AutoGraphOutlinedIcon,
  },
  {
    label: 'Cost per result',
    value: '$2.16',
    detail: '-11.4%',
    tone: 'text-amber-600',
    Icon: QueryStatsOutlinedIcon,
  },
];

const activeCampaigns = [
  {
    title: 'Spring product launch',
    objective: 'Website visits',
    budget: '$4,800',
    status: 'Learning',
    statusClass: 'bg-amber-100 text-amber-700',
    progress: 64,
  },
  {
    title: 'Creator retargeting',
    objective: 'App installs',
    budget: '$2,250',
    status: 'Live',
    statusClass: 'bg-emerald-100 text-emerald-700',
    progress: 82,
  },
  {
    title: 'Support plan awareness',
    objective: 'Lead generation',
    budget: '$1,700',
    status: 'Review',
    statusClass: 'bg-sky-100 text-sky-700',
    progress: 38,
  },
];

const quickActions = [
  {
    title: 'Create a campaign',
    description: 'Pick an objective, daily budget, and timeline audience.',
    Icon: RocketLaunchOutlinedIcon,
  },
  {
    title: 'Build an audience',
    description: 'Reach followers, lookalikes, or visitors who already clicked.',
    Icon: GroupsOutlinedIcon,
  },
  {
    title: 'Adjust targeting',
    description: 'Tune locations, interests, placements, and bid controls.',
    Icon: TuneOutlinedIcon,
  },
];

const checklist = [
  'Connect conversion tracking',
  'Refresh two creatives before fatigue',
  'Move budget to the highest intent audience',
];

function Ads() {
  return (
    <div className="flex-[0.5] min-w-[600px] max-w-[680px] border-r border-[#eff3f4] bg-white h-screen overflow-y-auto text-[#0f1419]">
      <div className="sticky top-0 z-20 border-b border-[#eff3f4] bg-white/90 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div>
            <h1 className="text-[20px] font-bold">Ads</h1>
            <p className="text-[13px] text-[#536471]">
              Plan campaigns, manage spend, and improve promoted posts
            </p>
          </div>
          <button
            type="button"
            className="rounded-[8px] bg-[#0f1419] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#272c30]"
          >
            New campaign
          </button>
        </div>
      </div>

      <section className="relative min-h-[260px] overflow-hidden border-b border-[#eff3f4]">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
          alt="Marketing team reviewing campaign ideas"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1419]/80 via-[#0f1419]/50 to-white/10" />
        <div className="relative max-w-[430px] px-6 py-8 text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[8px] bg-white/90 px-3 py-1.5 text-[13px] font-semibold text-[#0f1419]">
            <CampaignOutlinedIcon className="!text-[17px] text-[#1d9bf0]" />
            Campaign center
          </div>
          <h2 className="text-[31px] font-black leading-[1.08]">
            Reach the people most likely to act.
          </h2>
          <p className="mt-3 text-[15px] leading-6 text-white/90">
            Launch ads from posts that already perform, compare audiences, and keep budget focused on measurable results.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-[8px] bg-white px-5 py-2.5 text-[14px] font-bold text-[#0f1419] transition hover:bg-[#e6ecf0]"
            >
              Promote a post
            </button>
            <button
              type="button"
              className="rounded-[8px] border border-white/70 bg-transparent px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-white/10"
            >
              View reports
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eff3f4] px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          {campaignStats.map(({ label, value, detail, tone, Icon }) => (
            <div
              key={label}
              className="rounded-[8px] border border-[#eff3f4] bg-white px-4 py-4 transition hover:border-[#d7e3ec] hover:bg-[#fbfdff]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] text-[#536471]">{label}</p>
                <Icon className={`!text-[20px] ${tone}`} />
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <span className="text-[28px] font-black leading-none">{value}</span>
                <span className={`text-[13px] font-semibold ${tone}`}>{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#eff3f4] py-2">
        <div className="px-4 py-3">
          <h2 className="text-[20px] font-extrabold">Active campaigns</h2>
          <p className="mt-1 text-[14px] text-[#536471]">
            Monitor delivery, budget pacing, and campaign health.
          </p>
        </div>

        {activeCampaigns.map((campaign) => (
          <div
            key={campaign.title}
            className="cursor-pointer px-4 py-4 transition hover:bg-gray-50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-bold">{campaign.title}</h3>
                  <span className={`rounded-[8px] px-2 py-1 text-[12px] font-semibold ${campaign.statusClass}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="mt-1 text-[14px] text-[#536471]">{campaign.objective}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] text-[#536471]">Budget</p>
                <p className="text-[15px] font-bold">{campaign.budget}</p>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-[8px] bg-[#eff3f4]">
              <div
                className="h-full rounded-[8px] bg-[#1d9bf0]"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[13px] text-[#536471]">
              <span>{campaign.progress}% delivered</span>
              <span>Open campaign</span>
            </div>
          </div>
        ))}
      </section>

      <section className="border-b border-[#eff3f4] px-4 py-5">
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(({ title, description, Icon }) => (
            <button
              key={title}
              type="button"
              className="rounded-[8px] border border-[#eff3f4] bg-white p-4 text-left transition hover:border-[#d7e3ec] hover:bg-[#fbfdff]"
            >
              <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-[#f3f8fc] text-[#1d9bf0]">
                <Icon className="!text-[22px]" />
              </div>
              <h3 className="mt-3 text-[15px] font-bold leading-tight">{title}</h3>
              <p className="mt-2 text-[13px] leading-5 text-[#536471]">{description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="border-b border-[#eff3f4] py-2">
        <div className="px-4 py-3">
          <h2 className="text-[20px] font-extrabold">Optimization checklist</h2>
        </div>

        {checklist.map((item) => (
          <div
            key={item}
            className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <CheckCircleOutlineIcon className="!text-[22px] text-emerald-600" />
              <span className="text-[15px] font-semibold">{item}</span>
            </div>
            <ArrowOutwardIcon className="text-[#536471]" />
          </div>
        ))}
      </section>

      <section className="px-4 py-5">
        <div className="flex items-start justify-between gap-4 rounded-[8px] bg-[#f7f9f9] px-5 py-5">
          <div>
            <p className="text-[13px] font-semibold text-[#536471]">Recommended move</p>
            <h2 className="mt-2 text-[22px] font-extrabold leading-tight">
              Shift 15% more budget to retargeting before the weekend.
            </h2>
            <p className="mt-2 max-w-[430px] text-[14px] leading-6 text-[#536471]">
              Retargeted audiences are converting at a lower cost and still have room for delivery.
            </p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-white text-[#1d9bf0] shadow-sm">
            <BarChartOutlinedIcon className="!text-[26px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ads;
