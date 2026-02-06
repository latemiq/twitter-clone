import React from "react";  
import "./App.css";
import Feed from "./Feed";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import Button from '@mui/material/Button';


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
