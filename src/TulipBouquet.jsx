import React, { useState } from "react";
import Swal from "sweetalert2";

const TULIPS = [
  {
    id: 1,
    color: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-300",
    title: "A Promise of Growth 🌷",
    message: "My love for you grows deeper and more beautiful every single day, just like a blooming tulip. You are my forever spring, Laiba. ❤️",
    position: "top-4 left-6",
    rotation: "-rotate-12",
  },
  {
    id: 2,
    color: "from-rose-500 to-red-600",
    shadow: "shadow-rose-400",
    title: "A Promise of Commitment 💍",
    message: "I promise to hold your hand, listen to your heartbeat, and love you endlessly through every single chapter of our lives as your husband. 💍✨",
    position: "top-0 left-1/2 -translate-x-1/2",
    rotation: "rotate-0",
  },
  {
    id: 3,
    color: "from-amber-400 to-amber-500",
    shadow: "shadow-amber-200",
    title: "A Promise of Joy 🧸",
    message: "No matter how busy life gets, I promise to make you laugh, bring you ice cream, and protect that gorgeous smile of yours. 🍦💛",
    position: "top-6 right-6",
    rotation: "rotate-12",
  },
  {
    id: 4,
    color: "from-pink-300 to-pink-500",
    shadow: "shadow-pink-200",
    title: "A Promise of Sanctuary 🏡",
    message: "You're not just my partner, Laiba; you are my home, my comfort, and my favorite adventure. I can't wait to build a beautiful life together. 🏡💞",
    position: "top-16 left-12",
    rotation: "-rotate-6",
  },
  {
    id: 5,
    color: "from-purple-400 to-indigo-500",
    shadow: "shadow-purple-300",
    title: "A Promise of Eternity 👩‍❤️‍👨",
    message: "Thank you for being the sweetest, most elegant Mohtarma and choosing me. I will cherish you, respect you, and stand by you for all of eternity. 👩‍❤️‍👨✨",
    position: "top-14 right-12",
    rotation: "rotate-6",
  },
];

const TulipBouquet = () => {
  const [activeTulip, setActiveTulip] = useState(null);

  const handleTulipClick = (tulip) => {
    setActiveTulip(tulip);
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
    <div className="w-full max-w-lg mx-auto my-8 px-4 z-20 flex flex-col items-center">
      <h2
        className="text-2xl md:text-3xl text-center text-rose-500 font-bold mb-1"
        style={{ fontFamily: "Charm, serif" }}
      >
        Your Virtual Tulip Bouquet 🌷
      </h2>
      <p className="text-center text-xs text-stone-600 mb-8 max-w-sm">
        Click on each tulip in the bouquet to unlock a hidden promise from my heart to yours. ✨
      </p>

      {/* The Bouquet Graphic */}
      <div className="relative w-72 h-80 bg-transparent flex flex-col items-center">
        {/* Tulips Container */}
        <div className="absolute inset-x-0 top-0 h-44 z-10">
          {TULIPS.map((tulip) => (
            <button
              key={tulip.id}
              onClick={() => handleTulipClick(tulip)}
              className={`absolute ${tulip.position} ${tulip.rotation} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 focus:outline-none`}
            >
              {/* Tulip Flower Head */}
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-12 rounded-t-full bg-gradient-to-b ${tulip.color} shadow-lg ${tulip.shadow} flex justify-center items-end relative overflow-hidden`}
                  >
                    {/* Inner petal lines/shading */}
                    <div className="absolute inset-y-0 left-1/3 w-0.5 bg-white/20" />
                    <div className="absolute inset-y-0 right-1/3 w-0.5 bg-white/20" />
                    {/* Tulip Petal Overlap */}
                    <div className="absolute bottom-0 w-8 h-8 rounded-full border-t border-white/30 bg-black/5" />
                  </div>
                  {/* Stem */}
                  <div className="w-1.5 h-16 bg-emerald-500/80 -mt-1 rounded-full relative">
                    {/* Stem Leaf */}
                    <div className="absolute top-2 -left-3 w-4 h-2 bg-emerald-500/70 rounded-full rotate-45" />
                  </div>
                </div>
                {/* Glow Ring */}
                <div className="absolute -inset-1 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
              </div>
            </button>
          ))}
        </div>

        {/* Bouquet Wrap Wrapper */}
        <div className="absolute bottom-4 w-44 h-48 flex justify-center items-end">
          {/* Stem Bunches */}
          <div className="absolute bottom-2 flex gap-1 z-0">
            <div className="w-1.5 h-20 bg-emerald-600/90 rotate-6 rounded-full" />
            <div className="w-1.5 h-20 bg-emerald-600/90 -rotate-3 rounded-full" />
            <div className="w-1.5 h-20 bg-emerald-600/90 -rotate-12 rounded-full" />
            <div className="w-1.5 h-20 bg-emerald-600/90 rotate-12 rounded-full" />
          </div>

          {/* Wrap paper (cone shape) */}
          <div className="relative w-44 h-40 overflow-hidden z-20">
            {/* Left wrap fold */}
            <div className="absolute bottom-0 left-0 w-32 h-36 bg-amber-100/90 border border-amber-200/50 rounded-tr-3xl shadow-md rotate-12 origin-bottom-left" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }} />
            {/* Right wrap fold */}
            <div className="absolute bottom-0 right-0 w-32 h-36 bg-amber-50/95 border border-amber-200/50 rounded-tl-3xl shadow-lg -rotate-12 origin-bottom-right" style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }} />

            {/* Ribbon Bow */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
              {/* Bow loop */}
              <div className="flex gap-2">
                <div className="w-6 h-4 bg-rose-500 rounded-full rotate-12 border border-rose-600" />
                <div className="w-6 h-4 bg-rose-500 rounded-full -rotate-12 border border-rose-600" />
              </div>
              {/* Bow center knot */}
              <div className="w-4 h-4 bg-rose-600 rounded-full -mt-3.5 border border-rose-700 shadow-md" />
              {/* Bow tails */}
              <div className="flex gap-4 -mt-1">
                <div className="w-1.5 h-6 bg-rose-500 rotate-12 rounded-full" />
                <div className="w-1.5 h-6 bg-rose-500 -rotate-12 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TulipBouquet;
