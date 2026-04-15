import React, { useMemo, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Avatar } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const topicSuggestions = [
  'Product launch',
  'Community AMA',
  'Design critique',
  'Gaming night',
  'Music session',
  'Startup talk',
];

const starterLiveSpaces = [
  {
    id: 'live-1',
    title: 'Shipping better product updates',
    topic: 'Product launch',
    hostName: 'Marta Kozlowska',
    hostHandle: '@martacodes',
    hostAvatar: 'https://i.pravatar.cc/160?img=12',
    listeners: '428 listening',
    audience: 'Everyone',
    recording: true,
    accentClass: 'bg-emerald-500',
  },
  {
    id: 'live-2',
    title: 'Late-night mix and open mic',
    topic: 'Music session',
    hostName: 'Chris Vega',
    hostHandle: '@chrisvega',
    hostAvatar: 'https://i.pravatar.cc/160?img=32',
    listeners: '211 listening',
    audience: 'Subscribers',
    recording: false,
    accentClass: 'bg-amber-500',
  },
];

const starterScheduledSpaces = [
  {
    id: 'scheduled-1',
    title: 'Founders Q&A: first 1000 users',
    topic: 'Startup talk',
    hostName: 'Nadia Reed',
    hostHandle: '@nrd',
    hostAvatar: 'https://i.pravatar.cc/160?img=47',
    scheduledFor: 'Apr 18, 6:30 PM',
    audience: 'Everyone',
    recording: true,
  },
  {
    id: 'scheduled-2',
    title: 'Weekly design review circle',
    topic: 'Design critique',
    hostName: 'Elena Park',
    hostHandle: '@elenapark',
    hostAvatar: 'https://i.pravatar.cc/160?img=21',
    scheduledFor: 'Apr 20, 8:00 PM',
    audience: 'Community',
    recording: true,
  },
];

function SpaceListItem({ item, mode }) {
  const isLive = mode === 'live';

  return (
    <div className="border-b border-[#eff3f4] px-4 py-4 transition hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <Avatar src={item.hostAvatar} alt={item.hostName} sx={{ width: 44, height: 44 }} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {isLive ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#fff1f2] px-2 py-1 text-[12px] font-semibold text-[#b42318]">
                <RadioButtonCheckedIcon className="!text-[14px]" />
                Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#eef8ff] px-2 py-1 text-[12px] font-semibold text-[#0b73b6]">
                <CalendarMonthOutlinedIcon className="!text-[14px]" />
                Scheduled
              </span>
            )}

            <span className="rounded-md bg-[#f7f9f9] px-2 py-1 text-[12px] font-medium text-[#536471]">
              {item.topic}
            </span>

            {item.recording && (
              <span className="inline-flex items-center gap-1 rounded-md bg-[#f4fce3] px-2 py-1 text-[12px] font-medium text-[#53710d]">
                <CheckCircleOutlineIcon className="!text-[14px]" />
                Recording on
              </span>
            )}
          </div>

          <h3 className="mt-2 text-[17px] font-bold leading-snug text-[#0f1419]">{item.title}</h3>
          <p className="mt-1 text-[14px] text-[#536471]">
            {item.hostName} <span className="mx-1">.</span>
            {item.hostHandle}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#536471]">
            <span className="inline-flex items-center gap-1">
              <PeopleOutlineIcon className="!text-[16px]" />
              {isLive ? item.listeners : item.scheduledFor}
            </span>
            <span>{item.audience}</span>
          </div>
        </div>

        <div className={`mt-1 hidden h-11 w-1.5 flex-shrink-0 rounded-full md:block ${item.accentClass || 'bg-[#1d9bf0]'}`} />
      </div>
    </div>
  );
}

function CreateSpace() {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(topicSuggestions[0]);
  const [details, setDetails] = useState('');
  const [audience, setAudience] = useState('Everyone');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [coHosts, setCoHosts] = useState('');
  const [recordingEnabled, setRecordingEnabled] = useState(true);
  const [liveSpaces, setLiveSpaces] = useState(starterLiveSpaces);
  const [scheduledSpaces, setScheduledSpaces] = useState(starterScheduledSpaces);
  const [feedback, setFeedback] = useState('');

  const displayName = useMemo(() => {
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim();
    return fullName || user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'Your host profile';
  }, [user]);

  const username = useMemo(() => {
    return user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'you';
  }, [user]);

  const hostAvatar = user?.imageUrl || '';

  const previewSchedule = useMemo(() => {
    if (!scheduledDate || !scheduledTime) {
      return 'Start immediately';
    }

    const selectedDate = new Date(`${scheduledDate}T${scheduledTime}`);

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(selectedDate);
  }, [scheduledDate, scheduledTime]);

  const previewCoHosts = useMemo(() => {
    return coHosts
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .slice(0, 3);
  }, [coHosts]);

  const resetComposer = () => {
    setTitle('');
    setDetails('');
    setAudience('Everyone');
    setScheduledDate('');
    setScheduledTime('');
    setCoHosts('');
    setRecordingEnabled(true);
  };

  const createSpacePayload = () => ({
    id: `${Date.now()}`,
    title: title.trim(),
    topic,
    hostName: displayName,
    hostHandle: `@${username}`,
    hostAvatar,
    audience,
    recording: recordingEnabled,
  });

  const handleGoLive = () => {
    if (!title.trim()) {
      setFeedback('Add a Space title before going live.');
      return;
    }

    const newLiveSpace = {
      ...createSpacePayload(),
      listeners: 'Starting now',
      accentClass: 'bg-rose-500',
    };

    setLiveSpaces((current) => [newLiveSpace, ...current]);
    setFeedback('Space is ready to go live.');
    resetComposer();
  };

  const handleSchedule = () => {
    if (!title.trim()) {
      setFeedback('Add a Space title before scheduling.');
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      setFeedback('Pick both a date and time for the scheduled Space.');
      return;
    }

    const newScheduledSpace = {
      ...createSpacePayload(),
      scheduledFor: previewSchedule,
    };

    setScheduledSpaces((current) => [newScheduledSpace, ...current]);
    setFeedback('Space added to the upcoming schedule.');
    resetComposer();
  };

  return (
    <div className="flex-[0.5] min-w-[600px] max-w-[680px] border-r border-[#eff3f4] bg-white text-[#0f1419] h-screen overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-[#eff3f4] bg-white/80 backdrop-blur-md">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Create your Space</h2>
              <p className="mt-1 text-[14px] text-[#536471]">Set the topic, invite co-hosts, then go live or schedule it.</p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-md bg-[#f7f9f9] px-3 py-2 text-[13px] font-medium text-[#536471]">
              <GraphicEqIcon className="!text-[18px] text-[#1d9bf0]" />
              Audio room
            </span>
          </div>
        </div>
      </div>

      <section className="border-b border-[#eff3f4] px-4 py-5">
        <div className="grid gap-5">
          <div className="flex items-start gap-3">
            <Avatar src={hostAvatar} alt={displayName} sx={{ width: 48, height: 48 }} />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold">{displayName}</p>
              <p className="text-[14px] text-[#536471]">@{username}</p>
            </div>
          </div>

          <div>
            <label htmlFor="space-title" className="mb-2 block text-[14px] font-semibold">
              Space title
            </label>
            <input
              id="space-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What do you want to talk about?"
              className="w-full rounded-lg border border-[#cfd9de] px-4 py-3 text-[15px] outline-none transition focus:border-[#1d9bf0]"
            />
          </div>

          <div>
            <label htmlFor="space-details" className="mb-2 block text-[14px] font-semibold">
              Details
            </label>
            <textarea
              id="space-details"
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="Give people one reason to join."
              rows={4}
              className="w-full resize-none rounded-lg border border-[#cfd9de] px-4 py-3 text-[15px] outline-none transition focus:border-[#1d9bf0]"
            />
          </div>

          <div>
            <p className="mb-2 text-[14px] font-semibold">Pick a topic</p>
            <div className="flex flex-wrap gap-2">
              {topicSuggestions.map((suggestion) => {
                const isActive = topic === suggestion;

                return (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setTopic(suggestion)}
                    className={`rounded-md border px-3 py-2 text-[14px] font-medium transition ${
                      isActive
                        ? 'border-[#1d9bf0] bg-[#eef8ff] text-[#0b73b6]'
                        : 'border-[#eff3f4] bg-white text-[#536471] hover:border-[#cfd9de] hover:bg-gray-50'
                    }`}
                  >
                    {suggestion}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="space-audience" className="mb-2 block text-[14px] font-semibold">
                Audience
              </label>
              <select
                id="space-audience"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="w-full rounded-lg border border-[#cfd9de] bg-white px-4 py-3 text-[15px] outline-none transition focus:border-[#1d9bf0]"
              >
                <option value="Everyone">Everyone</option>
                <option value="Subscribers">Subscribers</option>
                <option value="Community">Community</option>
              </select>
            </div>

            <div>
              <label htmlFor="space-cohosts" className="mb-2 block text-[14px] font-semibold">
                Co-hosts
              </label>
              <input
                id="space-cohosts"
                type="text"
                value={coHosts}
                onChange={(event) => setCoHosts(event.target.value)}
                placeholder="@alex, @sam"
                className="w-full rounded-lg border border-[#cfd9de] px-4 py-3 text-[15px] outline-none transition focus:border-[#1d9bf0]"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="space-date" className="mb-2 block text-[14px] font-semibold">
                Date
              </label>
              <input
                id="space-date"
                type="date"
                value={scheduledDate}
                onChange={(event) => setScheduledDate(event.target.value)}
                className="w-full rounded-lg border border-[#cfd9de] px-4 py-3 text-[15px] outline-none transition focus:border-[#1d9bf0]"
              />
            </div>

            <div>
              <label htmlFor="space-time" className="mb-2 block text-[14px] font-semibold">
                Time
              </label>
              <input
                id="space-time"
                type="time"
                value={scheduledTime}
                onChange={(event) => setScheduledTime(event.target.value)}
                className="w-full rounded-lg border border-[#cfd9de] px-4 py-3 text-[15px] outline-none transition focus:border-[#1d9bf0]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRecordingEnabled((current) => !current)}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
              recordingEnabled ? 'border-[#9fda8f] bg-[#f4fce3]' : 'border-[#eff3f4] bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MicNoneOutlinedIcon className={recordingEnabled ? 'text-[#53710d]' : 'text-[#536471]'} />
              <div>
                <p className="text-[15px] font-semibold">Record this Space</p>
                <p className="text-[13px] text-[#536471]">Let people listen again after the live session ends.</p>
              </div>
            </div>
            <span className={`text-[13px] font-semibold ${recordingEnabled ? 'text-[#53710d]' : 'text-[#536471]'}`}>
              {recordingEnabled ? 'On' : 'Off'}
            </span>
          </button>
        </div>
      </section>

      <section className="border-b border-[#eff3f4] px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-[17px] font-bold">Space preview</h3>
            <p className="mt-1 text-[14px] text-[#536471]">Check how your room will appear before you publish it.</p>
          </div>
          <AutoAwesomeIcon className="text-[#d97706]" />
        </div>

        <div className="mt-4 rounded-lg border border-[#eff3f4] bg-[#fcfdff] p-4">
          <div className="flex items-start gap-3">
            <Avatar src={hostAvatar} alt={displayName} sx={{ width: 44, height: 44 }} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#eef8ff] px-2 py-1 text-[12px] font-semibold text-[#0b73b6]">
                  {topic}
                </span>
                <span className="rounded-md bg-[#f7f9f9] px-2 py-1 text-[12px] font-medium text-[#536471]">
                  {audience}
                </span>
                <span className="rounded-md bg-[#fff8e7] px-2 py-1 text-[12px] font-medium text-[#a16207]">
                  {previewSchedule}
                </span>
              </div>

              <h4 className="mt-3 text-[18px] font-bold leading-snug">
                {title.trim() || 'Your Space title will appear here'}
              </h4>
              <p className="mt-1 text-[14px] text-[#536471]">
                Hosted by {displayName} <span className="mx-1">.</span>@{username}
              </p>

              <p className="mt-3 text-[14px] leading-6 text-[#0f1419]">
                {details.trim() || 'Add a short description so people know why they should join the room.'}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#536471]">
                <span className="inline-flex items-center gap-1">
                  <CalendarMonthOutlinedIcon className="!text-[16px]" />
                  {previewSchedule}
                </span>
                <span className="inline-flex items-center gap-1">
                  <PeopleOutlineIcon className="!text-[16px]" />
                  {previewCoHosts.length > 0 ? previewCoHosts.join(', ') : 'No co-hosts yet'}
                </span>
                <span>{recordingEnabled ? 'Recording enabled' : 'Recording disabled'}</span>
              </div>
            </div>
          </div>
        </div>

        {feedback && <p className="mt-3 text-[14px] font-medium text-[#0b73b6]">{feedback}</p>}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGoLive}
            className="rounded-full bg-[#0f1419] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#272c30]"
          >
            Go live now
          </button>
          <button
            type="button"
            onClick={handleSchedule}
            className="rounded-full bg-[#1d9bf0] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#1a8cd8]"
          >
            Schedule Space
          </button>
        </div>
      </section>

      <section className="border-b border-[#eff3f4]">
        <div className="px-4 py-3">
          <h3 className="text-[17px] font-bold">Live now</h3>
          <p className="mt-1 text-[14px] text-[#536471]">Use these rooms as a quick benchmark for pacing and topic framing.</p>
        </div>

        {liveSpaces.map((space) => (
          <SpaceListItem key={space.id} item={space} mode="live" />
        ))}
      </section>

      <section>
        <div className="px-4 py-3">
          <h3 className="text-[17px] font-bold">Upcoming Spaces</h3>
          <p className="mt-1 text-[14px] text-[#536471]">Scheduled sessions stay here after you publish them.</p>
        </div>

        {scheduledSpaces.map((space) => (
          <SpaceListItem key={space.id} item={space} mode="scheduled" />
        ))}
      </section>
    </div>
  );
}

export default CreateSpace;
