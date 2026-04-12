import React from "react";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const performanceCards = [
  {
    label: "Profile visits",
    value: "18.4K",
    change: "+12.8%",
    tone: "text-emerald-600",
  },
  {
    label: "Qualified leads",
    value: "642",
    change: "+7.3%",
    tone: "text-sky-600",
  },
  {
    label: "Campaign CTR",
    value: "4.8%",
    change: "+1.1 pts",
    tone: "text-orange-600",
  },
  {
    label: "Revenue pipeline",
    value: "$126K",
    change: "This month",
    tone: "text-violet-600",
  },
];

const programs = [
  {
    title: "Verified Organizations",
    description: "Add affiliates, secure your brand identity, and unlock company-only tools.",
    badge: "Popular",
    badgeClass: "bg-sky-100 text-sky-700",
    Icon: BusinessCenterOutlinedIcon,
    iconClass: "bg-sky-100 text-sky-700",
  },
  {
    title: "Growth campaigns",
    description: "Promote launches, recruit customers, and retarget the audiences that already engage.",
    badge: "High intent",
    badgeClass: "bg-emerald-100 text-emerald-700",
    Icon: CampaignOutlinedIcon,
    iconClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Storefront setup",
    description: "Highlight products, pricing, and limited offers directly on your profile.",
    badge: "New",
    badgeClass: "bg-orange-100 text-orange-700",
    Icon: StorefrontOutlinedIcon,
    iconClass: "bg-orange-100 text-orange-700",
  },
];

const quickActions = [
  {
    title: "Launch a campaign",
    description: "Boost a post that is already converting organically.",
    Icon: RocketLaunchOutlinedIcon,
  },
  {
    title: "Review audience segments",
    description: "Compare founders, creators, and customer support conversations.",
    Icon: GroupsOutlinedIcon,
  },
  {
    title: "Open analytics",
    description: "Track reach, clicks, conversions, and top-performing topics.",
    Icon: InsightsOutlinedIcon,
  },
  {
    title: "Plan your next drop",
    description: "Line up announcements, product demos, and follow-up posts.",
    Icon: CalendarMonthOutlinedIcon,
  },
];

const playbook = [
  {
    title: "Pin one commercial message",
    description: "Keep the clearest offer at the top of your feed so new visitors land on a decision point.",
  },
  {
    title: "Reply within the first hour",
    description: "Fast responses lift conversion on launch-day threads and customer support mentions.",
  },
  {
    title: "Rotate proof every week",
    description: "Swap in customer wins, screenshots, and short demos before creatives fatigue.",
  },
];

const activity = [
  {
    title: "Spring launch campaign",
    status: "Ready to publish",
    meta: "Audience size: 214K matched users",
    tone: "text-emerald-700",
  },
  {
    title: "Affiliate onboarding",
    status: "3 seats waiting",
    meta: "Invite sales, support, and partnerships",
    tone: "text-sky-700",
  },
  {
    title: "Creator partnership shortlist",
    status: "8 profiles saved",
    meta: "Highest overlap with your last 30 days of engagement",
    tone: "text-orange-700",
  },
];

function Business() {
  return (
    <div className="flex-[0.5] min-w-[600px] max-w-[680px] border-r border-[#eff3f4] bg-white h-screen overflow-y-auto text-[#0f1419]">
      <div className="sticky top-0 z-20 border-b border-[#eff3f4] bg-white/85 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-[20px] font-bold">Business</h1>
            <p className="text-[13px] text-[#536471]">Growth tools, campaigns, and brand controls</p>
          </div>
          <button
            type="button"
            className="rounded-full bg-[#0f1419] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#272c30]"
          >
            Contact sales
          </button>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-[#eff3f4]">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
          alt="Analytics dashboard on a laptop"
          className="h-[240px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/18 to-black/55" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
          <div className="max-w-[460px]">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-1 text-[13px] font-semibold text-[#0f1419] shadow-sm">
              <BoltOutlinedIcon className="!text-[16px] text-[#f59e0b]" />
              Ready for launch week
            </div>
            <h2 className="text-[31px] font-black leading-[1.05] text-white">
              Turn your profile into a sales and support channel.
            </h2>
            <p className="mt-3 max-w-[420px] text-[15px] leading-6 text-white/92">
              Build authority, run performance campaigns, and move high-intent traffic from conversation to conversion.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-white px-5 py-2.5 text-[14px] font-bold text-[#0f1419] transition hover:bg-[#e6ecf0]"
              >
                Start campaign
              </button>
              <button
                type="button"
                className="rounded-full border border-white/70 bg-transparent px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-white/12"
              >
                Compare plans
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eff3f4] px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          {performanceCards.map((card) => (
            <div
              key={card.label}
              className="rounded-[8px] border border-[#eff3f4] bg-white px-4 py-4 transition hover:border-[#d7e3ec] hover:bg-[#fbfdff]"
            >
              <p className="text-[13px] text-[#536471]">{card.label}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="text-[28px] font-black leading-none">{card.value}</span>
                <span className={`text-[13px] font-semibold ${card.tone}`}>{card.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#eff3f4] py-2">
        <div className="px-4 py-3">
          <h2 className="text-[20px] font-extrabold">Business programs</h2>
          <p className="mt-1 text-[14px] text-[#536471]">
            Pick the workflow that fits your team and current growth target.
          </p>
        </div>

        {programs.map(({ title, description, badge, badgeClass, Icon, iconClass }) => (
          <div
            key={title}
            className="flex cursor-pointer items-start justify-between gap-4 px-4 py-4 transition hover:bg-gray-50"
          >
            <div className="flex gap-3">
              <div className={`mt-1 grid h-11 w-11 place-items-center rounded-[8px] ${iconClass}`}>
                <Icon className="!text-[22px]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-bold">{title}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[12px] font-semibold ${badgeClass}`}>
                    {badge}
                  </span>
                </div>
                <p className="mt-1 max-w-[430px] text-[14px] leading-6 text-[#536471]">{description}</p>
              </div>
            </div>
            <ArrowOutwardIcon className="mt-1 text-[#536471]" />
          </div>
        ))}
      </section>

      <section className="border-b border-[#eff3f4] py-2">
        <div className="px-4 py-3">
          <h2 className="text-[20px] font-extrabold">Quick actions</h2>
        </div>

        {quickActions.map(({ title, description, Icon }) => (
          <div
            key={title}
            className="flex cursor-pointer items-start gap-3 px-4 py-4 transition hover:bg-gray-50"
          >
            <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#f3f8fc] text-[#1d9bf0]">
              <Icon className="!text-[22px]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-bold">{title}</h3>
                <ArrowOutwardIcon className="text-[#536471]" />
              </div>
              <p className="mt-1 text-[14px] leading-6 text-[#536471]">{description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="border-b border-[#eff3f4] px-4 py-5">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-[20px] font-extrabold">This week</h2>
            <div className="mt-4 space-y-4">
              {activity.map((item) => (
                <div key={item.title} className="border-l-2 border-[#e5eef5] pl-4">
                  <div className="flex items-center gap-2">
                    <CheckCircleOutlineIcon className={`!text-[18px] ${item.tone}`} />
                    <span className={`text-[13px] font-semibold ${item.tone}`}>{item.status}</span>
                  </div>
                  <h3 className="mt-1 text-[15px] font-bold">{item.title}</h3>
                  <p className="mt-1 text-[14px] leading-6 text-[#536471]">{item.meta}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] font-extrabold">Playbook</h2>
            <div className="mt-4 space-y-4">
              {playbook.map((item, index) => (
                <div key={item.title}>
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-[#536471]">
                    <TrendingUpOutlinedIcon className="!text-[18px] text-[#1d9bf0]" />
                    Step {index + 1}
                  </div>
                  <h3 className="mt-1 text-[15px] font-bold">{item.title}</h3>
                  <p className="mt-1 text-[14px] leading-6 text-[#536471]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-5">
        <div className="flex items-start justify-between gap-4 rounded-[8px] bg-[#f7fbff] px-5 py-5">
          <div className="max-w-[430px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#1d9bf0]">
              Recommended next step
            </p>
            <h2 className="mt-2 text-[22px] font-extrabold leading-tight">
              Connect analytics, assign your team, and ship one commercial campaign this week.
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#536471]">
              Businesses that publish consistent proof and respond fast usually turn profile traffic into repeat demand.
            </p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#1d9bf0] shadow-sm">
            <InsightsOutlinedIcon className="!text-[28px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Business;
