import React from "react";
import Swal from "sweetalert2";

const TULIPS = [
  {
    id: 1,
    title: "A Promise of Growth 🌷",
    message: "My love for you grows deeper and more beautiful every single day, just like a blooming tulip. You are my forever spring, Laiba. ❤️",
    position: "left-[8%] top-[5%]",
    rotation: "-rotate-12",
    swayDelay: "0s",
    colors: {
      backStart: "#db2777",
      backEnd: "#9d174d",
      leftStart: "#f472b6",
      leftEnd: "#db2777",
      rightStart: "#ec4899",
      rightEnd: "#be185d",
      frontStart: "#fbcfe8",
      frontEnd: "#f472b6",
    }
  },
  {
    id: 2,
    title: "A Promise of Commitment 💍",
    message: "I promise to hold your hand, listen to your heartbeat, and love you endlessly through every single chapter of our lives as your husband. 💍✨",
    position: "left-[36%] top-[-5%]",
    rotation: "-rotate-3",
    swayDelay: "0.8s",
    colors: {
      backStart: "#dc2626",
      backEnd: "#991b1b",
      leftStart: "#f87171",
      leftEnd: "#dc2626",
      rightStart: "#ef4444",
      rightEnd: "#b91c1c",
      frontStart: "#fca5a5",
      frontEnd: "#f87171",
    }
  },
  {
    id: 3,
    title: "A Promise of Joy 🧸",
    message: "No matter how busy life gets, I promise to make you laugh, bring you ice cream, and protect that gorgeous smile of yours. 🍦💛",
    position: "left-[64%] top-[2%]",
    rotation: "rotate-12",
    swayDelay: "1.5s",
    colors: {
      backStart: "#d97706",
      backEnd: "#92400e",
      leftStart: "#fbbf24",
      leftEnd: "#d97706",
      rightStart: "#f59e0b",
      rightEnd: "#b45309",
      frontStart: "#fde68a",
      frontEnd: "#fbbf24",
    }
  },
  {
    id: 4,
    title: "A Promise of Sanctuary 🏡",
    message: "You're not just my partner, Laiba; you are my home, my comfort, and my favorite adventure. I can't wait to build a beautiful life together. 🏡💞",
    position: "left-[18%] top-[16%]",
    rotation: "-rotate-6",
    swayDelay: "2.2s",
    colors: {
      backStart: "#7e22ce",
      backEnd: "#581c87",
      leftStart: "#a855f7",
      leftEnd: "#7e22ce",
      rightStart: "#8b5cf6",
      rightEnd: "#6d28d9",
      frontStart: "#d8b4fe",
      frontEnd: "#a855f7",
    }
  },
  {
    id: 5,
    title: "A Promise of Eternity 👩‍❤️‍👨",
    message: "Thank you for being the sweetest, most elegant Mohtarma and choosing me. I will cherish you, respect you, and stand by you for all of eternity. 👩‍❤️‍👨✨",
    position: "left-[48%] top-[14%]",
    rotation: "rotate-6",
    swayDelay: "1.1s",
    colors: {
      backStart: "#ea580c",
      backEnd: "#9a3412",
      leftStart: "#fb923c",
      leftEnd: "#ea580c",
      rightStart: "#f97316",
      rightEnd: "#c2410c",
      frontStart: "#ffedd5",
      frontEnd: "#fdba74",
    }
  },
];

const TulipBouquet = () => {
  const handleTulipClick = (tulip) => {
    Swal.fire({
      title: `<span style="font-family: 'Charm', serif; font-weight: bold; color: #e11d48">${tulip.title}</span>`,
      html: `<p style="font-family: 'Charm', serif; font-size: 1.15rem; line-height: 1.6; color: #374151">${tulip.message}</p>`,
      width: 500,
      padding: "2em",
      confirmButtonText: "I love this! 💖",
      confirmButtonColor: "#e11d48",
      background: "#fffefc",
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp animate__faster",
      },
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 z-20 flex flex-col items-center select-none">
      <h2
        className="text-3xl md:text-4xl text-center text-rose-500 font-bold mb-1"
        style={{ fontFamily: "Charm, serif" }}
      >
        Your Virtual Tulip Bouquet 🌷
      </h2>
      <p className="text-center text-sm text-stone-600 mb-8 max-w-sm">
        Click on each tulip in the bouquet to unlock a hidden promise from my heart to yours. ✨
      </p>

      {/* 3D Layered Bouquet Container */}
      <div className="relative w-80 h-96 flex flex-col items-center">
        
        {/* Layer 0: Backing Wrapper (Inside shadow & background paper) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg viewBox="0 0 300 400" className="w-full h-full">
            <path
              d="M35,160 C80,90 220,90 265,160 C245,220 200,320 150,380 C100,320 55,220 35,160 Z"
              fill="url(#backWrapGrad)"
            />
            <defs>
              <linearGradient id="backWrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eed9c4" />
                <stop offset="100%" stopColor="#d5bdaf" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Layer 1: Stems & Flowers (Interactive) */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {TULIPS.map((tulip) => {
            const c = tulip.colors;
            return (
              <button
                key={tulip.id}
                onClick={() => handleTulipClick(tulip)}
                className={`absolute ${tulip.position} ${tulip.rotation} w-24 h-44 focus:outline-none transition-transform duration-300 hover:scale-110 hover:-translate-y-2`}
                style={{
                  animation: `tulip-sway 4s ease-in-out infinite`,
                  animationDelay: tulip.swayDelay,
                  transformOrigin: "bottom center",
                }}
              >
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id={`gradBack-${tulip.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={c.backStart} />
                      <stop offset="100%" stopColor={c.backEnd} />
                    </linearGradient>
                    <linearGradient id={`gradLeft-${tulip.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={c.leftStart} />
                      <stop offset="100%" stopColor={c.leftEnd} />
                    </linearGradient>
                    <linearGradient id={`gradRight-${tulip.id}`} x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={c.rightStart} />
                      <stop offset="100%" stopColor={c.rightEnd} />
                    </linearGradient>
                    <linearGradient id={`gradFront-${tulip.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={c.frontStart} />
                      <stop offset="100%" stopColor={c.frontEnd} />
                    </linearGradient>
                  </defs>
                  
                  {/* Stem */}
                  <path d="M50,90 Q47,150 50,200" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" />
                  
                  {/* Leaves */}
                  <path d="M50,140 Q25,120 35,95 Q45,120 50,140" fill="#047857" opacity="0.9" />
                  <path d="M50,155 Q75,135 65,110 Q55,135 50,155" fill="#065f46" opacity="0.85" />

                  {/* Tulip Flower Bud */}
                  <g className="cursor-pointer">
                    {/* Back center petal */}
                    <path d="M50,20 C32,20 35,80 50,90 C65,80 68,20 50,20 Z" fill={`url(#gradBack-${tulip.id})`} />
                    
                    {/* Left wing petal */}
                    <path d="M50,20 C24,28 20,78 50,90 C36,70 36,35 50,20 Z" fill={`url(#gradLeft-${tulip.id})`} />
                    
                    {/* Right wing petal */}
                    <path d="M50,20 C76,28 80,78 50,90 C64,70 64,35 50,20 Z" fill={`url(#gradRight-${tulip.id})`} />
                    
                    {/* Front center petal */}
                    <path d="M50,28 C36,38 36,75 50,90 C64,75 64,38 50,28 Z" fill={`url(#gradFront-${tulip.id})`} />
                  </g>
                </svg>
              </button>
            );
          })}
        </div>

        {/* Layer 2: Front Wrapping Paper & Silk Ribbon Bow (Overlay, click-through) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-2xl">
            {/* Left wrap flap */}
            <path
              d="M30,170 C90,195 120,320 150,380 C95,310 45,240 30,170 Z"
              fill="#ebd9d5"
              opacity="0.85"
            />
            
            {/* Right wrap flap (overlap) */}
            <path
              d="M270,170 C210,195 180,320 150,380 C205,310 255,240 270,170 Z"
              fill="#f5ebe0"
              opacity="0.9"
            />
            
            {/* Center overlap wrap */}
            <path
              d="M65,190 C120,170 180,170 235,190 C195,280 170,350 150,380 C130,350 105,280 65,190 Z"
              fill="url(#frontWrapGrad)"
              stroke="#eed9c4"
              strokeWidth="0.5"
            />
            
            {/* Folds shaded accents */}
            <path d="M65,190 C100,165 140,210 150,380 C135,210 85,200 65,190 Z" fill="#e3d5ca" opacity="0.4" />
            <path d="M235,190 C200,165 160,210 150,380 C165,210 215,200 235,190 Z" fill="#f5ebe0" opacity="0.4" />
            
            {/* Silk Ribbon Bow */}
            {/* Left loop */}
            <path
              d="M150,320 C120,295 105,315 125,325 C135,330 145,325 150,320 Z"
              fill="url(#ribbonGrad)"
              stroke="#f43f5e"
              strokeWidth="0.5"
            />
            {/* Right loop */}
            <path
              d="M150,320 C180,295 195,315 175,325 C165,330 155,325 150,320 Z"
              fill="url(#ribbonGrad)"
              stroke="#f43f5e"
              strokeWidth="0.5"
            />
            {/* Knot */}
            <circle cx="150" cy="320" r="7" fill="#be185d" />
            {/* Tails */}
            <path
              d="M148,323 C138,345 142,365 135,375"
              fill="none"
              stroke="#be185d"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M152,323 C162,345 158,365 165,375"
              fill="none"
              stroke="#be185d"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            <defs>
              <linearGradient id="frontWrapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5ebe0" />
                <stop offset="100%" stopColor="#e3d5ca" />
              </linearGradient>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>

      <style>{`
        @keyframes tulip-sway {
          0%, 100% {
            transform: rotate(var(--tw-rotate, 0deg));
          }
          50% {
            transform: rotate(calc(var(--tw-rotate, 0deg) + 3deg)) translateY(-1px);
          }
        }
      `}</style>
    </div>
  );
};

export default TulipBouquet;
