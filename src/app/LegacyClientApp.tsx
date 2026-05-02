"use client";

import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SplashScreen from "../features/splash/SplashScreen";

export default function LegacyClientApp() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("splash-seen");
    setShowSplash(!seen);
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleDismiss = () => {
    sessionStorage.setItem("splash-seen", "1");
    setShowSplash(false);
  };

  return (
    <BrowserRouter>
      {showSplash && <SplashScreen onDismiss={handleDismiss} />}
      <App />
    </BrowserRouter>
  );
}
