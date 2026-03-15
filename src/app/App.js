import { Navigate, Route, Routes } from "react-router-dom";
import Feed from "../features/tweets/components/Feed";
import Sidebar from "../features/navigation/components/Sidebar";
import Widgets from "../features/explore/components/Widgets";
import Explore from "../features/navigation/tabs/Explore";
import Notifications from "../features/navigation/tabs/Notifications";
import Messages from "../features/navigation/tabs/Messages";
import Bookmarks from "../features/navigation/tabs/Bookmarks";
import Lists from "../features/navigation/tabs/Lists";
import Profile from "../features/navigation/tabs/Profile";
import Communities from "../features/navigation/tabs/Communities";
import Business from "../features/navigation/tabs/Business";
import Ads from "../features/navigation/tabs/Ads";
import CreateSpace from "../features/navigation/tabs/CreateSpace";
import Settings from "../features/navigation/tabs/Settings";

function App() {
  return (
    <div className="app flex h-[100vh] w-full max-w-[1300px] mx-auto px-[10px] py-0 overflow-x-hidden">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/business" element={<Business />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/create-space" element={<CreateSpace />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings-privacy" element={<Navigate to="/settings" replace />} />
        <Route path="/more" element={<Navigate to="/lists" replace />} />
      </Routes>

      <Widgets />
    </div>
  );
}

export default App;
