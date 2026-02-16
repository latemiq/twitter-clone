import React, { useState, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CameraAltIcon from '@mui/icons-material/CameraAlt'; // Nowa ikona aparatu
import CloseIcon from '@mui/icons-material/Close'; // Ikona anulowania

const tabs = ["Posts", "Replies", "Highlights", "Articles", "Media", "Likes"];

function Profile() {
  // 1. STAN DANYCH
  const [isEditing, setIsEditing] = useState(false); // Czy jesteśmy w trybie edycji?
  const [banner, setBanner] = useState(null); // Tło (null = domyślny kolor)
  const [avatar, setAvatar] = useState(null); // Awatar (null = litera J)

  // 2. REFERENCJE DO UKRYTYCH INPUTÓW
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // 3. OBSŁUGA WYBORU PLIKÓW
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Tworzymy tymczasowy URL do podglądu zdjęcia
      const imageUrl = URL.createObjectURL(file);
      
      if (type === 'banner') setBanner(imageUrl);
      if (type === 'avatar') setAvatar(imageUrl);
    }
  };

  return (
    <div className="flex-[0.4] min-w-[620px] max-w-[700px] h-screen overflow-y-auto bg-white text-[#0f1419] border-x border-[#eff3f4]">
      
      {/* --- UKRYTE INPUTY (To one technicznie pobierają plik) --- */}
      <input 
        type="file" 
        ref={bannerInputRef} 
        onChange={(e) => handleFileChange(e, 'banner')} 
        hidden 
        accept="image/*"
      />
      <input 
        type="file" 
        ref={avatarInputRef} 
        onChange={(e) => handleFileChange(e, 'avatar')} 
        hidden 
        accept="image/*"
      />

      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-[#eff3f4]">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4 flex-1">
            <span className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer transition">
              <ArrowBackIcon />
            </span>
            <div className="flex flex-col">
              <h1 className="text-[20px] font-bold">John Kowal</h1>
              <p className="text-[13px] text-[#536471]">0 posts</p>
            </div>
          </div>
          <span className="w-9 h-9 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer transition">
             {/* Jeśli edytujemy, pokaż X, jeśli nie - lupę (opcjonalne) */}
             {isEditing ? <CloseIcon onClick={() => setIsEditing(false)}/> : <SearchIcon />}
          </span>
        </div>
      </div>

      {/* --- BANNER (TŁO) --- */}
      <div className="relative h-[200px] bg-[#cfd9de] border-b border-[#eff3f4]">
        {/* Wyświetlanie zdjęcia, jeśli jest wybrane */}
        {banner && (
          <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        )}

        {/* Nakładka z aparatem (widoczna tylko w trybie edycji) */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-4">
            <div 
              onClick={() => bannerInputRef.current.click()} // Kliknięcie w ikonę klika w ukryty input
              className="w-10 h-10 bg-black/50 rounded-full text-white grid place-items-center cursor-pointer hover:bg-black/70 transition"
            >
              <CameraAltIcon />
            </div>
            {/* Opcjonalnie: ikona X do usunięcia tła */}
            {banner && (
               <div onClick={() => setBanner(null)} className="w-10 h-10 bg-black/50 rounded-full text-white grid place-items-center cursor-pointer hover:bg-black/70 transition">
                 <CloseIcon />
               </div>
            )}
          </div>
        )}
      </div>

      <section className="relative px-6 pb-5">
        
        {/* --- AWATAR --- */}
        <div className="absolute -top-16 left-4">
          <div className="relative w-[130px] h-[130px]">
            
            {/* Sam obrazek lub litera */}
            <div className={`w-full h-full rounded-full border-4 border-white overflow-hidden bg-pink-500 grid place-items-center ${!avatar && 'text-white text-5xl font-semibold'}`}>
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                "J"
              )}
            </div>

            {/* Ikona aparatu (tylko w edycji) */}
            {isEditing && (
              <div 
                onClick={() => avatarInputRef.current.click()}
                className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/40 transition"
              >
                <CameraAltIcon className="text-white !text-3xl" />
              </div>
            )}
          </div>
        </div>

        {/* PRZYCISK EDYCJI */}
        <div className="flex justify-end pt-4 h-[60px]">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`px-5 py-2 rounded-full font-bold text-[15px] transition border 
              ${isEditing 
                ? "bg-black text-white border-black hover:bg-gray-800" 
                : "border-[#cfd9de] hover:bg-gray-100"
              }`}
          >
            {isEditing ? "Save" : "Edit profile"}
          </button>
        </div>

        {/* DANE PROFILOWE */}
        <h2 className="text-xl font-bold mt-4">John Kowal</h2>
        <p className="text-[#536471]">@johnyykowal</p>

        <div className="flex items-center gap-2 mt-3 text-[#536471] text-sm">
          <CalendarMonthOutlinedIcon fontSize="small" />
          <span>Joined February 2026</span>
        </div>

        <div className="flex gap-6 mt-3 text-sm">
          <div><span className="font-bold">1</span> <span className="text-[#536471]">Following</span></div>
          <div><span className="font-bold">0</span> <span className="text-[#536471]">Followers</span></div>
        </div>
      </section>

      {/* TABS (Bez zmian) */}
      <nav className="grid grid-cols-6 border-y border-[#eff3f4]">
        {tabs.map((tab, index) => {
          const isActive = index === 0;
          return (
            <div
              key={tab}
              className={`relative text-center py-4 text-[15px] font-semibold cursor-pointer transition
              ${isActive ? "text-[#0f1419]" : "text-[#536471] hover:bg-gray-100"}`}
            >
              {tab}
              {isActive && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#1d9bf0] rounded-full" />
              )}
            </div>
          );
        })}
      </nav>

    </div>
  );
}

export default Profile;