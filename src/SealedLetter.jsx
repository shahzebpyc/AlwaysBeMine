import React, { useState, useEffect } from "react";

const SealedLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = `Dearest Laiba,

From the moment you walked into my life, you completely changed my world. You are the sweetest, most elegant Mohtarma, and my heart belongs entirely to you.

I built this little corner of the internet just for you, to show you how much you mean to me. Thank you for saying Yes, and for being the love of my life.

Yours forever,
Shahzeb ❤️`;

  useEffect(() => {
    if (isOpen) {
      let index = 0;
      setTypedText("");
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 45);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full max-w-lg px-4 z-20">
      {!isOpen ? (
        <div 
          onClick={() => setIsOpen(true)}
          className="relative w-80 h-52 bg-amber-100/90 rounded-b-xl shadow-2xl cursor-pointer transform hover:-translate-y-2 transition-all duration-500 flex items-center justify-center border border-amber-200/50"
        >
          {/* Top Flap */}
          <div className="absolute top-0 left-0 right-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[110px] border-t-amber-200/95 origin-top transition-transform duration-500 z-30" />
          
          {/* Inner Pocket Background */}
          <div className="absolute inset-0 bg-amber-50 rounded-b-xl overflow-hidden z-10">
            {/* Left and Right folds */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-amber-200/60 border-t-[110px] border-t-transparent z-20" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] border-r-amber-200/60 border-t-[110px] border-t-transparent z-20" />
            {/* Bottom Fold */}
            <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[110px] border-b-amber-100/90 z-20" />
          </div>

          {/* Wax Seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center shadow-lg border-2 border-rose-700 hover:scale-110 active:scale-95 transition-transform duration-300 z-40 animate-pulse">
            <span className="text-white text-3xl font-bold select-none">❤️</span>
          </div>
          
          <div className="absolute bottom-4 text-amber-700/60 text-xs font-semibold tracking-wider font-mono">
            CLICK TO OPEN
          </div>
        </div>
      ) : (
        <div className="relative w-full bg-amber-50/95 backdrop-blur-sm border-2 border-amber-200 rounded-2xl shadow-2xl p-6 md:p-8 text-stone-800 transition-all duration-500 overflow-hidden animate-fadeIn">
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-300 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-300 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-300 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-300 rounded-br-xl" />
          
          {/* Content */}
          <div className="whitespace-pre-line font-serif leading-relaxed text-lg tracking-wide select-none min-h-[220px]" style={{ fontFamily: "'Charm', serif", fontWeight: "700" }}>
            {typedText}
            {typedText.length < fullText.length && (
              <span className="animate-ping font-bold ml-1 text-rose-500">|</span>
            )}
          </div>

          {/* Reset Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-6 text-stone-400 hover:text-stone-600 transition-colors text-xs uppercase font-mono tracking-widest flex items-center gap-1 mx-auto"
          >
            ✉️ Close Letter
          </button>
        </div>
      )}
    </div>
  );
};

export default SealedLetter;
