import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import gsap from 'gsap';

// Dodałem prop 'onClick', żebyś mógł przekazać funkcję wysyłania tweeta
function TweetBtn({ onClick }) { 
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const planeRef = useRef(null);
  
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    // Jeśli rodzic przekazał funkcję onClick (np. wysyłanie do bazy), uruchom ją
    if (onClick) onClick(e);

    // Jeśli animacja już trwa, nie rób nic więcej
    if (isAnimating) return; 
    setIsAnimating(true);

    gsap.set([textRef.current, planeRef.current], { transformOrigin: 'center center' });

    const tl = gsap.timeline();

    // --- ANIMACJA ---
    tl.to(textRef.current, {
      scale: 0, opacity: 0, duration: 0.3, ease: "back.in(1.7)"
    })
    .fromTo(planeRef.current, 
      { scale: 0, opacity: 0, x: 0, y: 0, rotation: 0 }, 
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 
      "<"
    )
    .to(planeRef.current, {
      x: 120, y: -120, rotation: -45, scale: 0.5, opacity: 0, duration: 0.5, ease: "power2.in", delay: 0.1
    })
    .to(textRef.current, {
      scale: 1, opacity: 1, duration: 0.4, delay: 0.2, ease: "back.out(1.5)",
      onStart: () => gsap.set(planeRef.current, { clearProps: 'all' }),
      onComplete: () => setIsAnimating(false)
    });
  };

  return (
    <Button 
      ref={buttonRef}
      
      // 1. TUTAJ DODAŁEM TYPE SUBMIT
      type="submit" 
      
      // 2. Obsługa kliknięcia (Animacja + Logika formularza)
      onClick={handleClick}
      
      variant="contained" 
      className="
        !bg-[var(--twiter-color)] !text-white !font-bold !normal-case !rounded-full 
        !w-[120px] !h-[45px] !text-[15px] shadow-sm hover:shadow-md 
        !overflow-hidden !relative
      "
    >
      <span ref={textRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block whitespace-nowrap">
        Tweet
      </span>
      <div ref={planeRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none flex items-center justify-center">
        <SendIcon className="!text-white !h-6 !w-6" />
      </div>
    </Button>
  );
}

export default TweetBtn;