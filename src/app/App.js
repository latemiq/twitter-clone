import "./App.css";
import Feed from "../features/tweets/components/Feed";
import Sidebar from "../features/navigation/components/Sidebar";
import Widgets from "../features/explore/components/Widgets";


function App() {
  return (
    <div className="app flex h-[100vh] max-w-[1300px] mx-auto px-[10px] py-0">
        <Sidebar /> 
        <Feed />
        <Widgets />
    </div>
  );
}

export default App;

