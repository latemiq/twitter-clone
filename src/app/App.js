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
import More from "../features/navigation/tabs/More";

function App() {
  return (
    <div className="app flex h-[100vh] max-w-[1300px] mx-auto px-[10px] py-0">
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
        <Route path="/more" element={<More />} />
      </Routes>

      <Widgets />
    </div>
  );
}

export default App;
