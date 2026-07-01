import React, { useState, useEffect } from "react";

const SealedLetter = ({ isOpen, setIsOpen }) => {
  const [typedText, setTypedText] = useState("");
  const [isFlowerLoaded, setIsFlowerLoaded] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 1200);
  };

  const greetingText = "Dearest Laiba,";
  const bodyText = `From the moment you walked into my life, you completely changed my world. You are the sweetest, most elegant Mohtarma, and my heart belongs entirely to you.

I built this little corner of the internet just for you, to show you how much you mean to me. Thank you for saying Yes, and for being the love of my life.`;
  const signatureText = `Yours forever,
Shahzeb ❤️`;

  const fullText = greetingText + "\n\n" + bodyText + "\n\n" + signatureText;

  const getLetterParts = (text) => {
    let greeting = "";
    let body = "";
    let signature = "";

    if (!text) return { greeting, body, signature };

    const L = text.length;
    const greetingLen = greetingText.length;
    const transition1 = greetingLen + 2; 
    const bodyLen = bodyText.length;
    const transition2 = transition1 + bodyLen + 2;

    if (L <= greetingLen) {
      greeting = greetingText.substring(0, L);
    } else if (L < transition1) {
      greeting = greetingText;
    } else if (L <= transition1 + bodyLen) {
      greeting = greetingText;
      body = bodyText.substring(0, L - transition1);
    } else if (L < transition2) {
      greeting = greetingText;
      body = bodyText;
    } else {
      greeting = greetingText;
      body = bodyText;
      signature = signatureText.substring(0, L - transition2);
    }

    return { greeting, body, signature };
  };

  useEffect(() => {
    if (isOpen) {
      // Trigger flower blooming animation shortly after modal opens
      const timer = setTimeout(() => {
        setIsFlowerLoaded(true);
      }, 150);

      // Typing effect
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

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    } else {
      setIsFlowerLoaded(false);
      setTypedText("");
    }
  }, [isOpen]);

  return (
    <div className={`flex flex-col items-center justify-center my-8 w-full max-w-lg px-4 transition-all duration-500 ${isOpening ? "z-[60]" : "z-20"}`}>
      {/* Seamless Transition Dark Fade-in Overlay */}
      {isOpening && (
        <div className="fixed inset-0 bg-[#030712] z-50 animate-fade-in-dark"></div>
      )}

      {!isOpen ? (
        <div 
          onClick={handleOpenClick}
          className={`relative w-80 h-52 bg-[#fdf6e2] rounded-b-xl shadow-2xl transition-all duration-700 flex items-center justify-center border border-[#ebdcb9] ${isOpening ? "pointer-events-none scale-95 opacity-0 translate-y-[-20px] delay-700" : "cursor-pointer hover:-translate-y-2"}`}
          style={{ perspective: "1000px" }}
        >
          {/* Top Flap */}
          <div 
            className="absolute top-0 left-0 right-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-t-[110px] border-t-[#eddcb8] origin-top transition-all duration-500 z-30" 
            style={{
              transform: isOpening ? "rotateX(180deg) translateY(-2px)" : "rotateX(0deg)",
              transformOrigin: "top center",
              borderTopColor: isOpening ? "#e6cfab" : "#eddcb8"
            }}
          />
          
          {/* Wax Seal */}
          <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center shadow-lg border-2 border-rose-700 transition-all duration-500 z-40 ${isOpening ? "opacity-0 scale-75" : "animate-pulse hover:scale-110"}`}
          >
            <span className="text-white text-3xl font-bold select-none">❤️</span>
          </div>

          {/* Letter preview inside envelope that slides up */}
          <div 
            className="absolute bottom-2 w-[280px] h-[150px] bg-[#fcf9f2] border border-amber-900/10 shadow-inner rounded-t z-15 transition-all duration-1000 ease-in-out flex flex-col items-center justify-start p-4"
            style={{
              transform: isOpening ? "translateY(-130px) scale(1.05)" : "translateY(0) scale(1)",
              opacity: isOpening ? 0.9 : 0.4
            }}
          >
            <div className="w-20 h-1 bg-amber-900/20 rounded mb-2"></div>
            <div className="w-40 h-1 bg-amber-900/10 rounded mb-1"></div>
            <div className="w-36 h-1 bg-amber-900/10 rounded"></div>
          </div>
          
          {/* Inner Pocket Background */}
          <div className="absolute inset-0 bg-[#f5ebd3] rounded-b-xl overflow-hidden z-10">
            {/* Left and Right folds */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-[#eedfb9]/80 border-t-[110px] border-t-transparent z-20" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[160px] border-r-[#eedfb9]/80 border-t-[110px] border-t-transparent z-20" />
            {/* Bottom Fold */}
            <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent border-b-[110px] border-b-[#fcf5e3]/90 z-20" />
          </div>

          {!isOpening && (
            <div className="absolute bottom-4 text-amber-700/60 text-xs font-semibold tracking-wider font-mono z-25">
              CLICK TO OPEN
            </div>
          )}
        </div>
      ) : (
        /* Magic Reveal Full Screen Overlay */
        <div className={`sealed-letter-modal ${!isFlowerLoaded ? "not-loaded" : ""}`}>
          {/* SVG Filter for organic burnt rough hand-torn edges */}
          <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }} width="0" height="0">
            <defs>
              <filter id="burnt-paper-edge">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Dark starry gradient night background */}
          <div className="night"></div>

          {/* Combined screen container - Side by Side on Desktop, Stacked on Mobile */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between w-full h-full max-w-none px-4 lg:pl-16 lg:pr-24 z-10 gap-6 lg:gap-12 pb-6 lg:pb-0 pt-4 lg:pt-0">
            
            {/* Left Side: The Flowers container */}
            <div className="relative w-full lg:w-[45%] h-[45vh] lg:h-[90vh] flex items-end justify-center">
              <div className="flowers">
                {/* Flower 1 (Pink Tulip) */}
                <div className="flower tulip flower--1">
                  <div className="flower__leafs flower__leafs--1">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>
                  </div>
                  <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                    <div className="flower__line__leaf flower__line__leaf--5"></div>
                    <div className="flower__line__leaf flower__line__leaf--6"></div>
                  </div>
                </div>

                {/* Flower 2 (Red Rose) */}
                <div className="flower rose flower--2">
                  <div className="flower__leafs flower__leafs--2">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>
                  </div>
                  <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                  </div>
                </div>

                {/* Flower 3 (Pink Tulip) */}
                <div className="flower tulip flower--3">
                  <div className="flower__leafs flower__leafs--3">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>
                  </div>
                  <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                  </div>
                </div>

                {/* Flower 4 (Golden Tulip) */}
                <div className="flower tulip flower--4">
                  <div className="flower__leafs flower__leafs--1">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>
                  </div>
                  <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                  </div>
                </div>

                {/* Flower 5 (Lavender Tulip) */}
                <div className="flower tulip flower--5">
                  <div className="flower__leafs flower__leafs--3">
                    <div className="flower__leaf flower__leaf--1"></div>
                    <div className="flower__leaf flower__leaf--2"></div>
                    <div className="flower__leaf flower__leaf--3"></div>
                    <div className="flower__leaf flower__leaf--4"></div>
                    <div className="flower__white-circle"></div>

                    <div className="flower__light flower__light--1"></div>
                    <div className="flower__light flower__light--2"></div>
                    <div className="flower__light flower__light--3"></div>
                    <div className="flower__light flower__light--4"></div>
                    <div className="flower__light flower__light--5"></div>
                    <div className="flower__light flower__light--6"></div>
                    <div className="flower__light flower__light--7"></div>
                    <div className="flower__light flower__light--8"></div>
                  </div>
                  <div className="flower__line">
                    <div className="flower__line__leaf flower__line__leaf--1"></div>
                    <div className="flower__line__leaf flower__line__leaf--2"></div>
                    <div className="flower__line__leaf flower__line__leaf--3"></div>
                    <div className="flower__line__leaf flower__line__leaf--4"></div>
                  </div>
                </div>

                <div className="grow-ans" style={{ "--d": "1.2s" }}>
                  <div className="flower__g-long">
                    <div className="flower__g-long__top"></div>
                    <div className="flower__g-long__bottom"></div>
                  </div>
                </div>

                <div className="growing-grass">
                  <div className="flower__grass flower__grass--1">
                    <div className="flower__grass--top"></div>
                    <div className="flower__grass--bottom"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                    <div className="flower__grass__overlay"></div>
                  </div>
                </div>

                <div className="growing-grass">
                  <div className="flower__grass flower__grass--2">
                    <div className="flower__grass--top"></div>
                    <div className="flower__grass--bottom"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--4"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--5"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--6"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--7"></div>
                    <div className="flower__grass__leaf flower__grass__leaf--8"></div>
                    <div className="flower__grass__overlay"></div>
                  </div>
                </div>

                <div className="grow-ans" style={{ "--d": "2.4s" }}>
                  <div className="flower__g-right flower__g-right--1">
                    <div className="leaf"></div>
                  </div>
                </div>

                <div className="grow-ans" style={{ "--d": "2.8s" }}>
                  <div className="flower__g-right flower__g-right--2">
                    <div className="leaf"></div>
                  </div>
                </div>

                <div className="grow-ans" style={{ "--d": "2.8s" }}>
                  <div className="flower__g-front">
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                    <div className="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                      <div className="flower__g-front__leaf"></div>
                    </div>
                  </div>
                </div>

                <div className="grow-ans" style={{ "--d": "3.2s" }}>
                  <div className="flower__g-fr">
                    <div className="leaf"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
                    <div className="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
                  </div>
                </div>

                {/* Long Grass Layers */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => {
                  const delays = ["3s", "3.6s", "4s", "4s", "4s", "4s", "4.2s", "3s"];
                  const delays2 = ["2.2s", "3.8s", "4.2s", "4.2s", "4.2s", "4.2s", "4.4s", "3.2s"];
                  const delays3 = ["3.4s", "4s", "4.4s", "3s", "3s", "3s", "4.6s", "3.5s"];
                  const delays4 = ["3.6s", "4.2s", "4.6s", "3.6s", "3.6s", "3.6s", "4.8s", "3.6s"];
                  return (
                    <div key={num} className={`long-g long-g--${num}`}>
                      <div className="grow-ans" style={{ "--d": delays[num] }}>
                        <div className="leaf leaf--0"></div>
                      </div>
                      <div className="grow-ans" style={{ "--d": delays2[num] }}>
                        <div className="leaf leaf--1"></div>
                      </div>
                      <div className="grow-ans" style={{ "--d": delays3[num] }}>
                        <div className="leaf leaf--2"></div>
                      </div>
                      <div className="grow-ans" style={{ "--d": delays4[num] }}>
                        <div className="leaf leaf--3"></div>
                      </div>
                    </div>
                  );
                })}

                {/* Ribbon removed per user request */}
              </div>
            </div>

            {/* Right Side: The Letter Card */}
            <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-end p-2">
              <div 
                className="relative z-[60] w-full max-w-[450px] bg-[#e3cfb1] p-2 transition-all duration-500 transform rotate-[0.5deg] hover:rotate-0 letter-entrance-animate"
                style={{
                  filter: "url(#burnt-paper-edge)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 2px #2c1a0c, 0 0 15px 3px rgba(35, 18, 5, 0.95), inset 0 0 40px rgba(44, 22, 6, 0.9), inset 0 0 20px rgba(120, 53, 4, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.75)"
                }}
              >
                
                {/* Embedded Floating Hearts (Red/Rose for Light Background) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bottom-[-30px] text-rose-600/15 text-xl animate-float-heart select-none"
                      style={{
                        left: `${12 + i * 16}%`,
                        animationDelay: `${i * 1.8}s`,
                        animationDuration: `${7 + i * 2.2}s`,
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>

                {/* Subtle Rose Watermark (Light Red/Pink) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
                  <svg className="w-64 h-64 text-rose-700 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C11.38 2 10.74 2.1 10.13 2.3c-.66.23-1.28.6-1.81 1.09-1.07.97-1.74 2.38-1.8 3.93C5.62 7.57 4.9 8.24 4.41 9.07c-.49.83-.71 1.76-.64 2.7.09 1.18.66 2.27 1.57 3.03l.36.3.06.46c.15 1.06.67 2.03 1.48 2.73.81.7 1.83 1.08 2.89 1.08.79 0 1.57-.21 2.26-.6 1.13.78 2.5 1.18 3.88 1.14 1.48-.05 2.88-.73 3.86-1.9 1-1.18 1.42-2.73 1.18-4.24-.13-.85-.49-1.66-1.03-2.33.68-.9 1.05-2.02 1.03-3.17-.02-1.32-.57-2.58-1.54-3.48-.97-.9-2.26-1.38-3.58-1.33-.8.03-1.58.26-2.28.67C14.73 2.76 13.4 2 12 2zm0 1.5c.98 0 1.93.53 2.44 1.38l.27.46.5-.18c.55-.2 1.14-.29 1.73-.27 1 .04 1.95.42 2.65 1.07s1.1 1.51 1.12 2.5c.02.83-.24 1.63-.73 2.28l-.34.45.23.46c.46.91.56 1.96.28 2.94-.28.98-.94 1.78-1.81 2.22l-.47.24.08.52c.16 1.03-.13 2.08-.79 2.87-.66.79-1.62 1.25-2.65 1.29-.97.04-1.93-.24-2.73-.78l-.48-.33-.49.33c-.56.38-1.22.58-1.88.58-.8 0-1.57-.29-2.18-.82-.61-.53-.99-1.26-1.09-2.06l-.07-.5-.46-.22c-.8-.39-1.39-1.1-1.65-1.96-.26-.86-.14-1.78.33-2.55l.26-.43-.37-.34c-.75-.68-1.18-1.63-1.21-2.63-.03-1 .34-1.97 1.03-2.67l.38-.38-.13-.52c-.17-.7.01-1.44.47-2.02.46-.58 1.12-.96 1.84-1.05l.52-.06.07-.52c.14-1.04.67-1.97 1.48-2.6.81-.63 1.81-.92 2.8-.82.68.07 1.33.31 1.88.7l.48.34.25-.49c.47-.93 1.38-1.52 2.41-1.52z"/>
                  </svg>
                </div>

                {/* Inner Border Stationery Sheet */}
                <div 
                  className="relative m-1 bg-[#f5e9ce] min-h-[520px] md:min-h-[600px] flex flex-col justify-between"
                  style={{
                    filter: "url(#burnt-paper-edge)",
                    border: "1px solid rgba(44, 22, 6, 0.15)",
                    boxShadow: "inset 0 0 25px rgba(67, 20, 7, 0.25)"
                  }}
                >
                  
                  {/* Feather Pen Icon */}
                  <div className="absolute top-4 right-6 text-3xl text-amber-900/10 pointer-events-none transform -rotate-45 select-none font-serif z-0">
                    ✒️
                  </div>

                  {/* 1. Invisible static template to hold the exact final size of the paper */}
                  {(() => {
                    const { greeting: fullGreeting, body: fullBody, signature: fullSignature } = getLetterParts(fullText);
                    return (
                      <div className="invisible pointer-events-none select-none w-full pl-10 pr-6 py-10 flex flex-col justify-between h-full">
                        <div>
                          {fullGreeting && (
                            <h2 className="text-3xl md:text-4xl text-[#4c0519] mb-4 text-left font-bold" style={{ fontFamily: "'Patrick Hand', cursive", paddingLeft: "1.5rem" }}>
                              {fullGreeting}
                            </h2>
                          )}
                          {fullBody && (
                            <p className="whitespace-pre-line text-lg md:text-xl leading-relaxed text-[#27272a] tracking-wide text-left font-semibold animate-pulse" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                              {fullBody}
                            </p>
                          )}
                        </div>

                        <div>
                          {fullSignature && (
                            <div className="mt-8 text-right pr-4 whitespace-pre-line text-3xl text-[#881337] font-semibold" style={{ fontFamily: "'Patrick Hand', cursive" }}>
                              {fullSignature}
                            </div>
                          )}

                          {/* Wax Seal spacing placeholder */}
                          <div className="flex flex-col items-center mt-6">
                            <div className="w-14 h-14"></div>
                            <span className="text-[10px] mt-1">Spacer</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* 2. Active overlay carrying the typed text animation and the interactive wax seal */}
                  <div className="absolute inset-0 pl-10 pr-6 py-10 flex flex-col justify-between z-10">
                    {(() => {
                      const { greeting, body, signature } = getLetterParts(typedText);
                      const isTyping = typedText.length < fullText.length;
                      const showCursorInGreeting = isTyping && !body && !signature;
                      const showCursorInBody = isTyping && body && !signature;
                      const showCursorInSignature = isTyping && signature;

                      return (
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            {/* Greeting */}
                            {greeting && (
                              <h2 
                                className="text-3xl md:text-4xl text-[#4c0519] mb-4 text-left font-bold"
                                style={{ 
                                  fontFamily: "'Patrick Hand', cursive",
                                  paddingLeft: "1.5rem"
                                }}
                              >
                                {greeting}
                                {showCursorInGreeting && (
                                  <span className="animate-ping font-bold ml-1 text-rose-600">|</span>
                                )}
                              </h2>
                            )}

                            {/* Body Paragraphs */}
                            {body && (
                              <p 
                                className="whitespace-pre-line text-lg md:text-xl leading-relaxed text-[#27272a] tracking-wide text-left font-semibold"
                                style={{ 
                                  fontFamily: "'Patrick Hand', cursive"
                                }}
                              >
                                {body}
                                {showCursorInBody && (
                                  <span className="animate-ping font-bold ml-1 text-rose-500">|</span>
                                )}
                              </p>
                            )}
                          </div>

                          <div>
                            {/* Signature */}
                            {signature && (
                              <div 
                                className="mt-8 text-right pr-4 whitespace-pre-line text-3xl text-[#881337] font-semibold"
                                style={{ 
                                  fontFamily: "'Patrick Hand', cursive"
                                }}
                              >
                                {signature}
                                {showCursorInSignature && (
                                  <span className="animate-ping font-bold ml-1 text-rose-600">|</span>
                                )}
                              </div>
                            )}

                            {/* Wax Seal Close Button */}
                            <div className="flex flex-col items-center mt-6 z-20">
                              <button 
                                onClick={() => setIsOpen(false)}
                                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-red-950/20 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                                title="Click seal to close letter"
                              >
                                {/* Organic wax ripples */}
                                <div className="absolute inset-0.5 rounded-full border border-red-500/20 pointer-events-none"></div>
                                {/* Wax stamp design (Gold Heart) */}
                                <span className="text-xl text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] select-none">❤️</span>
                              </button>
                              <span className="text-[10px] uppercase font-mono tracking-widest text-[#881337]/50 mt-1 select-none pointer-events-none">
                                Click seal to close
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Styled definitions scoped to our modal */}
          <style>{`
            .sealed-letter-modal .flowers *,
            .sealed-letter-modal .flowers *::after,
            .sealed-letter-modal .flowers *::before,
            .sealed-letter-modal .night *,
            .sealed-letter-modal .night *::after,
            .sealed-letter-modal .night *::before {
              padding: 0;
              margin: 0;
              box-sizing: border-box;
            }

            .sealed-letter-modal .letter-entrance-animate {
              animation: letter-entrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            .sealed-letter-modal {
              --dark-color: #030712;
              position: fixed;
              inset: 0;
              width: 100vw;
              height: 100vh;
              z-index: 100;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: var(--dark-color);
              overflow: hidden;
              perspective: 1000px;
            }

            .sealed-letter-modal .night {
              position: fixed;
              left: 50%;
              top: 0;
              transform: translateX(-50%);
              width: 100%;
              height: 100%;
              filter: blur(0.1vmin);
              background-image: radial-gradient(ellipse at top, #0f172a 0%, transparent 65%), radial-gradient(ellipse at bottom, #090d16, #020408);
              pointer-events: none;
              z-index: -1;
            }

            /* Fix: Match the original zero-width layout behavior of .flowers container */
            .sealed-letter-modal .flowers {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%) scale(0.65);
              width: 0;
              height: 0;
              z-index: 5;
              pointer-events: none;
            }
            @media (min-width: 1024px) {
              .sealed-letter-modal .flowers {
                transform: translateX(-50%) scale(0.85);
              }
            }



            .sealed-letter-modal .flower {
              position: absolute;
              bottom: 10vmin;
              transform-origin: bottom center;
              z-index: 10;
              --fl-speed: 0.8s;
            }

            /* Flower 1 - Soft Pink Tulip (Left-Center) */
            .sealed-letter-modal .flower--1 {
              left: -2vmin;
              transform: rotate(-14deg);
              animation: moving-flower-1 4s linear infinite;
            }
            .sealed-letter-modal .flower--1 .flower__line {
              height: 58vmin;
              animation-delay: 0.3s;
            }
            .sealed-letter-modal .flower--1 .flower__leafs::after {
              background-color: #fda4af;
              filter: blur(8vmin);
            }
            .sealed-letter-modal .flower--1 .flower__leaf {
              background-color: #fbcfe8;
              background-image: linear-gradient(to top, #e11d48, #fbcfe8);
            }
            .sealed-letter-modal .flower--1 .flower__leaf--4 {
              background-image: linear-gradient(to top, #be123c, #fda4af);
            }
            .sealed-letter-modal .flower--1 .flower__white-circle::after {
              background-image: linear-gradient(90deg, #fef08a, #facc15);
            }
            .sealed-letter-modal .flower--1 .flower__light:nth-child(odd) {
              background-color: #fbcfe8;
            }
            .sealed-letter-modal .flower--1 .flower__light:nth-child(even) {
              background-color: #fef08a;
            }
 
            /* Flower 2 - Deep Red Rose (Center) */
            .sealed-letter-modal .flower--2 {
              left: 0;
              transform: rotate(0deg);
              animation: moving-flower-2 4s linear infinite;
            }
            .sealed-letter-modal .flower--2 .flower__line {
              height: 65vmin;
              animation-delay: 0.6s;
            }
            .sealed-letter-modal .flower--2 .flower__leafs::after {
              background-color: #be123c;
              filter: blur(8vmin);
            }
            .sealed-letter-modal .flower--2 .flower__leaf {
              background-color: #e11d48;
              background-image: linear-gradient(to top, #881337, #f43f5e);
            }
            .sealed-letter-modal .flower--2 .flower__leaf--4 {
              background-image: linear-gradient(to top, #4c0519, #e11d48);
            }
            .sealed-letter-modal .flower--2 .flower__white-circle::after {
              background-image: linear-gradient(90deg, #f43f5e, #fb7185);
            }
            .sealed-letter-modal .flower--2 .flower__light:nth-child(odd) {
              background-color: #be123c;
            }
            .sealed-letter-modal .flower--2 .flower__light:nth-child(even) {
              background-color: #fcd34d;
            }
 
            /* Flower 3 - Soft Pink Tulip (Right-Center) */
            .sealed-letter-modal .flower--3 {
              left: 2vmin;
              transform: rotate(14deg);
              animation: moving-flower-3 4s linear infinite;
            }
            .sealed-letter-modal .flower--3 .flower__line {
              height: 58vmin;
              animation-delay: 0.9s;
            }
            .sealed-letter-modal .flower--3 .flower__leafs::after {
              background-color: #fda4af;
              filter: blur(8vmin);
            }
            .sealed-letter-modal .flower--3 .flower__leaf {
              background-color: #fbcfe8;
              background-image: linear-gradient(to top, #e11d48, #fbcfe8);
            }
            .sealed-letter-modal .flower--3 .flower__leaf--4 {
              background-image: linear-gradient(to top, #be123c, #fda4af);
            }
            .sealed-letter-modal .flower--3 .flower__white-circle::after {
              background-image: linear-gradient(90deg, #fef08a, #facc15);
            }
            .sealed-letter-modal .flower--3 .flower__light:nth-child(odd) {
              background-color: #fbcfe8;
            }
            .sealed-letter-modal .flower--3 .flower__light:nth-child(even) {
              background-color: #fef08a;
            }
 
            /* Flower 4 - Golden Yellow Tulip (Far-Left) */
            .sealed-letter-modal .flower--4 {
              left: -4vmin;
              transform: rotate(-28deg);
              animation: moving-flower-4 4.5s linear infinite;
            }
            .sealed-letter-modal .flower--4 .flower__line {
              height: 50vmin;
              animation-delay: 1.2s;
            }
            .sealed-letter-modal .flower--4 .flower__leafs::after {
              background-color: #fde047;
              filter: blur(8vmin);
            }
            .sealed-letter-modal .flower--4 .flower__leaf {
              background-color: #fef08a;
              background-image: linear-gradient(to top, #ca8a04, #fef08a);
            }
            .sealed-letter-modal .flower--4 .flower__leaf--4 {
              background-image: linear-gradient(to top, #a16207, #fde047);
            }
            .sealed-letter-modal .flower--4 .flower__white-circle::after {
              background-image: linear-gradient(90deg, #ca8a04, #fef08a);
            }
            .sealed-letter-modal .flower--4 .flower__light:nth-child(odd) {
              background-color: #fef08a;
            }
            .sealed-letter-modal .flower--4 .flower__light:nth-child(even) {
              background-color: #ca8a04;
            }
 
            /* Flower 5 - Lavender Tulip (Far-Right) */
            .sealed-letter-modal .flower--5 {
              left: 4vmin;
              transform: rotate(28deg);
              animation: moving-flower-5 4.5s linear infinite;
            }
            .sealed-letter-modal .flower--5 .flower__line {
              height: 50vmin;
              animation-delay: 1.5s;
            }
            .sealed-letter-modal .flower--5 .flower__leafs::after {
              background-color: #ddd6fe;
              filter: blur(8vmin);
            }
            .sealed-letter-modal .flower--5 .flower__leaf {
              background-color: #e9d5ff;
              background-image: linear-gradient(to top, #7c3aed, #e9d5ff);
            }
            .sealed-letter-modal .flower--5 .flower__leaf--4 {
              background-image: linear-gradient(to top, #6d28d9, #ddd6fe);
            }
            .sealed-letter-modal .flower--5 .flower__white-circle::after {
              background-image: linear-gradient(90deg, #7c3aed, #e9d5ff);
            }
            .sealed-letter-modal .flower--5 .flower__light:nth-child(odd) {
              background-color: #e9d5ff;
            }
            .sealed-letter-modal .flower--5 .flower__light:nth-child(even) {
              background-color: #7c3aed;
            }

            /* Stems & Leaves - Scoping to green hues instead of teal */
            .sealed-letter-modal .flower__line {
              height: 55vmin;
              width: 1.5vmin;
              background-image: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(255, 255, 255, 0.2)), linear-gradient(to top, transparent 10%, #064e3b, #10b981);
              box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
              animation: grow-flower-tree 4s backwards;
            }
            .sealed-letter-modal .flower__line__leaf {
              --w: 7vmin;
              --h: calc(var(--w) + 2vmin);
              position: absolute;
              top: 20%;
              left: 90%;
              width: var(--w);
              height: var(--h);
              border-top-right-radius: var(--h);
              border-bottom-left-radius: var(--h);
              background-image: linear-gradient(to top, rgba(4, 120, 87, 0.4), #10b981);
            }
            .sealed-letter-modal .flower__line__leaf--1 {
              transform: rotate(70deg) rotateY(30deg);
            }
            .sealed-letter-modal .flower__line__leaf--2 {
              top: 45%;
              transform: rotate(70deg) rotateY(30deg);
            }
            .sealed-letter-modal .flower__line__leaf--3, 
            .sealed-letter-modal .flower__line__leaf--4, 
            .sealed-letter-modal .flower__line__leaf--6 {
              border-top-right-radius: 0;
              border-bottom-left-radius: 0;
              border-top-left-radius: var(--h);
              border-bottom-right-radius: var(--h);
              left: -460%;
              top: 12%;
              transform: rotate(-70deg) rotateY(30deg);
            }
            .sealed-letter-modal .flower__line__leaf--4 {
              top: 40%;
            }
            .sealed-letter-modal .flower__line__leaf--5 {
              top: 0;
              transform-origin: left;
              transform: rotate(70deg) rotateY(30deg) scale(0.6);
            }
            .sealed-letter-modal .flower__line__leaf--6 {
              top: -2%;
              left: -450%;
              transform-origin: right;
              transform: rotate(-70deg) rotateY(30deg) scale(0.6);
            }

            /* Natural Green Foliage & Grass colors */
            .sealed-letter-modal .flower__grass {
              --c: #059669;
              --line-w: 1.5vmin;
              position: absolute;
              bottom: 12vmin;
              left: -7vmin;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              z-index: 20;
              transform-origin: bottom center;
              transform: rotate(-48deg) rotateY(40deg);
            }
            .sealed-letter-modal .flower__grass--1 {
              animation: moving-grass 2s linear infinite;
            }
            .sealed-letter-modal .flower__grass--2 {
              left: 2vmin;
              bottom: 10vmin;
              transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg);
              opacity: 0.8;
              z-index: 0;
              animation: moving-grass--2 1.5s linear infinite;
            }
            .sealed-letter-modal .flower__grass--top {
              width: 7vmin;
              height: 10vmin;
              border-top-right-radius: 100%;
              border-right: var(--line-w) solid var(--c);
              transform-origin: bottom center;
              transform: rotate(-2deg);
            }
            .sealed-letter-modal .flower__grass--bottom {
              margin-top: -2px;
              width: var(--line-w);
              height: 25vmin;
              background-image: linear-gradient(to top, transparent, var(--c));
            }
            .sealed-letter-modal .flower__grass__leaf {
              --size: 10vmin;
              position: absolute;
              width: calc(var(--size) * 2.1);
              height: var(--size);
              border-top-left-radius: var(--size);
              border-top-right-radius: var(--size);
              background-image: linear-gradient(to top, transparent, transparent 30%, var(--c));
              z-index: 100;
            }
            .sealed-letter-modal .flower__grass__overlay {
              position: absolute;
              top: -10%;
              right: 0%;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              filter: blur(1.5vmin);
              z-index: 100;
            }
            .sealed-letter-modal .flower__g-long {
              --w: 2vmin;
              --h: 6vmin;
              --c: #059669;
              position: absolute;
              bottom: 10vmin;
              left: -3vmin;
              transform-origin: bottom center;
              transform: rotate(-30deg) rotateY(-20deg);
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              animation: flower-g-long-ans 3s linear infinite;
            }
            .sealed-letter-modal .flower__g-long__top {
              top: calc(var(--h) * -1);
              width: calc(var(--w) + 1vmin);
              height: var(--h);
              border-top-right-radius: 100%;
              border-right: 0.7vmin solid var(--c);
              transform: translate(-0.7vmin, 1vmin);
            }
            .sealed-letter-modal .flower__g-long__bottom {
              width: var(--w);
              height: 50vmin;
              transform-origin: bottom center;
              background-image: linear-gradient(to top, transparent 30%, var(--c));
              box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
              clip-path: polygon(35% 0, 65% 1%, 100% 100%, 0% 100%);
            }
            .sealed-letter-modal .flower__g-right {
              position: absolute;
              bottom: 6vmin;
              left: -2vmin;
              transform-origin: bottom left;
              transform: rotate(20deg);
            }
            .sealed-letter-modal .flower__g-right .leaf {
              width: 30vmin;
              height: 50vmin;
              border-top-left-radius: 100%;
              border-left: 2vmin solid #047857;
              background-image: linear-gradient(to bottom, transparent, var(--dark-color) 60%);
              -webkit-mask-image: linear-gradient(to top, transparent 30%, #047857 60%);
            }
            .sealed-letter-modal .flower__g-right--1 {
              animation: flower-g-right-ans 2.5s linear infinite;
            }
            .sealed-letter-modal .flower__g-right--2 {
              left: 5vmin;
              transform: rotateY(-180deg);
              animation: flower-g-right-ans--2 3s linear infinite;
            }
            .sealed-letter-modal .flower__g-right--2 .leaf {
              height: 75vmin;
              filter: blur(0.3vmin);
              opacity: 0.8;
            }
            .sealed-letter-modal .flower__g-front {
              position: absolute;
              bottom: 6vmin;
              left: 2.5vmin;
              z-index: 100;
              transform-origin: bottom center;
              transform: rotate(-28deg) rotateY(30deg) scale(1.04);
              animation: flower__g-front-ans 2s linear infinite;
            }
            .sealed-letter-modal .flower__g-front__line {
              width: 0.3vmin;
              height: 20vmin;
              background-image: linear-gradient(to top, transparent, #047857, transparent 100%);
              position: relative;
            }
            .sealed-letter-modal .flower__g-front__leaf-wrapper {
              position: absolute;
              top: 0;
              left: 0;
              transform-origin: bottom left;
              transform: rotate(10deg);
            }
            .sealed-letter-modal .flower__g-front__leaf-wrapper:nth-child(even) {
              left: 0vmin;
              transform: rotateY(-180deg) rotate(5deg);
              animation: flower__g-front__leaf-left-ans 1s ease-in backwards;
            }
            .sealed-letter-modal .flower__g-front__leaf-wrapper:nth-child(odd) {
              animation: flower__g-front__leaf-ans 1s ease-in backwards;
            }
            .sealed-letter-modal .flower__g-front__leaf {
              width: 10vmin;
              height: 10vmin;
              border-radius: 100% 0% 0% 100%/100% 100% 0% 0%;
              box-shadow: inset 0 2px 1vmin hsla(140, 97%, 58%, 0.1);
              background-image: linear-gradient(to bottom left, transparent, var(--dark-color)), linear-gradient(to bottom right, #059669 50%, transparent 50%, transparent);
              -webkit-mask-image: linear-gradient(to bottom right, #059669 50%, transparent 50%, transparent);
            }
            .sealed-letter-modal .flower__g-fr {
              position: absolute;
              bottom: -4vmin;
              left: 10vmin;
              transform-origin: bottom left;
              z-index: 10;
              animation: flower__g-fr-ans 2s linear infinite;
            }
            .sealed-letter-modal .flower__g-fr .leaf {
              width: 30vmin;
              height: 50vmin;
              border-top-left-radius: 100%;
              border-left: 2vmin solid #047857;
              -webkit-mask-image: linear-gradient(to top, transparent 25%, #047857 50%);
              position: relative;
              z-index: 1;
            }
            .sealed-letter-modal .flower__g-fr__leaf {
              position: absolute;
              top: 0;
              left: 0;
              width: 10vmin;
              height: 10vmin;
              border-radius: 100% 0% 0% 100%/100% 100% 0% 0%;
              box-shadow: inset 0 2px 1vmin hsla(140, 97%, 58%, 0.1);
              background-image: linear-gradient(to bottom left, transparent, var(--dark-color) 98%), linear-gradient(to bottom right, #34d399 45%, transparent 50%, transparent);
              -webkit-mask-image: linear-gradient(135deg, #059669 40%, transparent 50%, transparent);
            }

            /* Natural Leaf Green for grass fields */
            .sealed-letter-modal .long-g {
              position: absolute;
              bottom: 25vmin;
              left: -42vmin;
              transform-origin: bottom left;
            }
            .sealed-letter-modal .long-g--1 {
              bottom: 0vmin;
              transform: scale(0.8) rotate(-5deg);
            }
            .sealed-letter-modal .long-g--1 .leaf {
              -webkit-mask-image: linear-gradient(to top, transparent 40%, #047857 80%) !important;
            }
            .sealed-letter-modal .long-g--1 .leaf--1 {
              --w: 5vmin;
              --h: 60vmin;
              left: -2vmin;
              transform: rotate(3deg) rotateY(-180deg);
            }
            .sealed-letter-modal .long-g--2, 
            .sealed-letter-modal .long-g--3 {
              bottom: -3vmin;
              left: -35vmin;
              transform-origin: center;
              transform: scale(0.6) rotateX(60deg);
            }
            .sealed-letter-modal .long-g--2 .leaf, 
            .sealed-letter-modal .long-g--3 .leaf {
              -webkit-mask-image: linear-gradient(to top, transparent 50%, #047857 80%) !important;
            }
            .sealed-letter-modal .long-g--2 .leaf--1, 
            .sealed-letter-modal .long-g--3 .leaf--1 {
              left: -1vmin;
              transform: rotateY(-180deg);
            }
            .sealed-letter-modal .long-g--3 {
              left: -17vmin;
              bottom: 0vmin;
            }
            .sealed-letter-modal .long-g--3 .leaf {
              -webkit-mask-image: linear-gradient(to top, transparent 40%, #047857 80%) !important;
            }
            .sealed-letter-modal .long-g--4 {
              left: 25vmin;
              bottom: -3vmin;
              transform-origin: center;
              transform: scale(0.6) rotateX(60deg);
            }
            .sealed-letter-modal .long-g--4 .leaf {
              -webkit-mask-image: linear-gradient(to top, transparent 50%, #047857 80%) !important;
            }
            .sealed-letter-modal .long-g--5 {
              left: 42vmin;
              bottom: 0vmin;
              transform: scale(0.8) rotate(2deg);
            }
            .sealed-letter-modal .long-g--6 {
              left: 0vmin;
              bottom: -20vmin;
              z-index: 100;
              filter: blur(0.3vmin);
              transform: scale(0.8) rotate(2deg);
            }
            .sealed-letter-modal .long-g--7 {
              left: 35vmin;
              bottom: 20vmin;
              z-index: -1;
              filter: blur(0.3vmin);
              transform: scale(0.6) rotate(2deg);
              opacity: 0.7;
            }
            .sealed-letter-modal .long-g .leaf {
              --w: 15vmin;
              --h: 40vmin;
              --c: #15803d;
              position: absolute;
              bottom: 0;
              width: var(--w);
              height: var(--h);
              border-top-left-radius: 100%;
              border-left: 2vmin solid var(--c);
              -webkit-mask-image: linear-gradient(to top, transparent 20%, var(--dark-color));
              transform-origin: bottom center;
            }

            /* Animations scoped to the modal */
            .sealed-letter-modal .flower__leafs {
              position: relative;
              animation: blooming-flower 2s backwards;
            }
            .sealed-letter-modal .flower__leafs--1 {
              animation-delay: 1.1s;
            }
            .sealed-letter-modal .flower__leafs--2 {
              animation-delay: 1.4s;
            }
            .sealed-letter-modal .flower__leafs--3 {
              animation-delay: 1.7s;
            }

            .sealed-letter-modal .flower__leaf {
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 8vmin;
              height: 11vmin;
              border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
              transform-origin: bottom center;
              opacity: 0.9;
              box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
            }

            .sealed-letter-modal .flower__leaf--1 {
              transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
            }

            .sealed-letter-modal .flower__leaf--2 {
              transform: translate(-50%, -4%) rotateX(40deg);
            }

            .sealed-letter-modal .flower__leaf--3 {
              transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
            }

            .sealed-letter-modal .flower__leaf--4 {
              width: 8vmin;
              height: 8vmin;
              transform-origin: bottom left;
              border-radius: 4vmin 10vmin 4vmin 4vmin;
              transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
              z-index: 1;
              opacity: 0.8;
            }

            /* Tulip Specific Blossom Shapes */
            .sealed-letter-modal .tulip .flower__leaf {
              width: 6.5vmin !important;
              height: 11vmin !important;
              border-radius: 50% 50% 50% 50% / 85% 85% 15% 15% !important;
              opacity: 0.95 !important;
            }
            .sealed-letter-modal .tulip .flower__leaf--1 {
              transform: translate(-95%, 0%) rotate(-24deg) rotateY(-10deg) !important;
              transform-origin: bottom right !important;
            }
            .sealed-letter-modal .tulip .flower__leaf--2 {
              transform: translate(-5%, 0%) rotate(24deg) rotateY(10deg) !important;
              transform-origin: bottom left !important;
            }
            .sealed-letter-modal .tulip .flower__leaf--3 {
              transform: translate(-50%, -6%) rotate(0deg) !important;
              z-index: 2 !important;
            }
            .sealed-letter-modal .tulip .flower__leaf--4 {
              transform: translate(-50%, 6%) scale(0.95) rotateX(20deg) !important;
              z-index: 10 !important;
              border-radius: 50% 50% 50% 50% / 80% 80% 20% 20% !important;
              opacity: 0.98 !important;
            }

            /* Rose Specific Blossom Shapes */
            .sealed-letter-modal .rose .flower__leaf {
              width: 8vmin !important;
              height: 10vmin !important;
              border-radius: 50% 50% 50% 50% / 60% 60% 40% 40% !important;
              opacity: 0.95 !important;
            }
            .sealed-letter-modal .rose .flower__leaf--1 {
              transform: translate(-80%, -4%) rotate(-35deg) !important;
              transform-origin: bottom center !important;
            }
            .sealed-letter-modal .rose .flower__leaf--2 {
              transform: translate(-20%, -4%) rotate(35deg) !important;
              transform-origin: bottom center !important;
            }
            .sealed-letter-modal .rose .flower__leaf--3 {
              transform: translate(-50%, -8%) scale(1.1) rotate(0deg) !important;
              z-index: 2 !important;
            }
            .sealed-letter-modal .rose .flower__leaf--4 {
              transform: translate(-50%, 6%) scale(1.05) rotateX(15deg) !important;
              z-index: 10 !important;
            }

            .sealed-letter-modal .flower__white-circle {
              position: absolute;
              left: -3.5vmin;
              top: -3vmin;
              width: 9vmin;
              height: 4vmin;
              border-radius: 50%;
              background-color: #ffffff;
            }

            .sealed-letter-modal .flower__light {
              position: absolute;
              bottom: 0vmin;
              width: 1vmin;
              height: 1vmin;
              border-radius: 50%;
              filter: blur(0.2vmin);
              animation: light-ans 4s linear infinite backwards;
            }
            
            .sealed-letter-modal .flower__light--1 { left: -2vmin; animation-delay: 1s; }
            .sealed-letter-modal .flower__light--2 { left: 3vmin; animation-delay: 0.5s; }
            .sealed-letter-modal .flower__light--3 { left: -6vmin; animation-delay: 0.3s; }
            .sealed-letter-modal .flower__light--4 { left: 6vmin; animation-delay: 0.9s; }
            .sealed-letter-modal .flower__light--5 { left: -1vmin; animation-delay: 1.5s; }
            .sealed-letter-modal .flower__light--6 { left: -4vmin; animation-delay: 3s; }
            .sealed-letter-modal .flower__light--7 { left: 3vmin; animation-delay: 2s; }
            .sealed-letter-modal .flower__light--8 { left: -6vmin; animation-delay: 3.5s; }

            .sealed-letter-modal .flower__grass__leaf--1 { top: -6%; left: 30%; --size: 6vmin; transform: rotate(-20deg); animation: growing-grass-ans--1 2s 2.6s backwards; }
            .sealed-letter-modal .flower__grass__leaf--2 { top: -5%; left: -110%; --size: 6vmin; transform: rotate(10deg); animation: growing-grass-ans--2 2s 2.4s linear backwards; }
            .sealed-letter-modal .flower__grass__leaf--3 { top: 5%; left: 60%; --size: 8vmin; transform: rotate(-18deg) rotateX(-20deg); animation: growing-grass-ans--3 2s 2.2s linear backwards; }
            .sealed-letter-modal .flower__grass__leaf--4 { top: 6%; left: -135%; --size: 8vmin; transform: rotate(2deg); animation: growing-grass-ans--4 2s 2s linear backwards; }
            .sealed-letter-modal .flower__grass__leaf--5 { top: 20%; left: 60%; --size: 10vmin; transform: rotate(-24deg) rotateX(-20deg); animation: growing-grass-ans--5 2s 1.8s linear backwards; }
            .sealed-letter-modal .flower__grass__leaf--6 { top: 22%; left: -180%; --size: 10vmin; transform: rotate(10deg); animation: growing-grass-ans--6 2s 1.6s linear backwards; }
            .sealed-letter-modal .flower__grass__leaf--7 { top: 39%; left: 70%; --size: 10vmin; transform: rotate(-10deg); animation: growing-grass-ans--7 2s 1.4s linear backwards; }
            .sealed-letter-modal .flower__grass__leaf--8 { top: 40%; left: -215%; --size: 11vmin; transform: rotate(10deg); animation: growing-grass-ans--8 2s 1.2s linear backwards; }

            .sealed-letter-modal .long-g .leaf--0 { left: 2vmin; animation: leaf-ans-1 4s linear infinite; }
            .sealed-letter-modal .long-g .leaf--1 { --w: 5vmin; --h: 60vmin; animation: leaf-ans-1 4s linear infinite; }
            .sealed-letter-modal .long-g .leaf--2 { --w: 10vmin; --h: 40vmin; left: -0.5vmin; bottom: 5vmin; transform-origin: bottom left; transform: rotateY(-180deg); animation: leaf-ans-2 3s linear infinite; }
            .sealed-letter-modal .long-g .leaf--3 { --w: 5vmin; --h: 30vmin; left: -1vmin; bottom: 3.2vmin; transform-origin: bottom left; transform: rotate(-10deg) rotateY(-180deg); animation: leaf-ans-3 3s linear infinite; }

            .sealed-letter-modal .flower--1 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 1.6s backwards; }
            .sealed-letter-modal .flower--1 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 1.4s backwards; }
            .sealed-letter-modal .flower--1 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 1.2s backwards; }
            .sealed-letter-modal .flower--1 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 1s backwards; }
            .sealed-letter-modal .flower--1 .flower__line__leaf--5 { animation: blooming-leaf-right var(--fl-speed) 1.8s backwards; }
            .sealed-letter-modal .flower--1 .flower__line__leaf--6 { animation: blooming-leaf-left var(--fl-speed) 2s backwards; }

            .sealed-letter-modal .flower--2 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 1.9s backwards; }
            .sealed-letter-modal .flower--2 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 1.7s backwards; }
            .sealed-letter-modal .flower--2 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 1.5s backwards; }
            .sealed-letter-modal .flower--2 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 1.3s backwards; }

            .sealed-letter-modal .flower--3 .flower__line__leaf--1 { animation: blooming-leaf-right var(--fl-speed) 2.5s backwards; }
            .sealed-letter-modal .flower--3 .flower__line__leaf--2 { animation: blooming-leaf-right var(--fl-speed) 2.3s backwards; }
            .sealed-letter-modal .flower--3 .flower__line__leaf--3 { animation: blooming-leaf-left var(--fl-speed) 2.1s backwards; }
            .sealed-letter-modal .flower--3 .flower__line__leaf--4 { animation: blooming-leaf-left var(--fl-speed) 1.9s backwards; }

            .sealed-letter-modal .flower__g-front__leaf-wrapper--1 { top: -8vmin; transform: scale(0.7); animation: flower__g-front__leaf-ans 1s 5.5s ease-in backwards !important; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--2 { top: -8vmin; transform: rotateY(-180deg) scale(0.7) !important; animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--3 { top: -3vmin; animation: flower__g-front__leaf-ans 1s 4.6s ease-in backwards; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--4 { top: -3vmin; transform: rotateY(-180deg) scale(0.9) !important; animation: flower__g-front__leaf-left-ans-2 1s 4.6s ease-in backwards !important; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--5 { top: 2vmin; animation-delay: 4.3s !important; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--6 { top: 2vmin; animation-delay: 4.1s !important; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--7 { top: 6.5vmin; animation-delay: 3.8s !important; }
            .sealed-letter-modal .flower__g-front__leaf-wrapper--8 { top: 6.5vmin; animation-delay: 3.5s !important; }

            .sealed-letter-modal .flower__g-fr__leaf--1 { left: 20vmin; transform: rotate(45deg); animation: flower__g-fr-leaft-ans-1 0.5s 5.2s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--2 { left: 12vmin; top: -7vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 0.5s 5s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--3 { left: 15vmin; top: 6vmin; transform: rotate(55deg); animation: flower__g-fr-leaft-ans-5 0.5s 4.8s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--4 { left: 6vmin; top: -2vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 0.5s 4.6s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--5 { left: 10vmin; top: 14vmin; transform: rotate(55deg); animation: flower__g-fr-leaft-ans-5 0.5s 4.4s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--6 { left: 0vmin; top: 6vmin; transform: rotate(25deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-6 0.5s 4.2s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--7 { left: 5vmin; top: 22vmin; transform: rotate(45deg); animation: flower__g-fr-leaft-ans-7 0.5s 4s linear backwards; }
            .sealed-letter-modal .flower__g-fr__leaf--8 { left: -4vmin; top: 15vmin; transform: rotate(15deg) rotateY(-180deg); animation: flower__g-fr-leaft-ans-8 0.5s 3.8s linear backwards; }

            .sealed-letter-modal .grow-ans {
              animation: grow-ans 2s var(--d) backwards;
            }
            .sealed-letter-modal .growing-grass {
              animation: growing-grass-ans 1s 2s backwards;
            }

            @keyframes fade-in-dark {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in-dark {
              animation: fade-in-dark 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }

            @keyframes leaf-ans-1 { 0%, 100% { transform: rotate(-5deg) scale(1); } 50% { transform: rotate(5deg) scale(1.1); } }
            @keyframes leaf-ans-2 { 0%, 100% { transform: rotateY(-180deg) rotate(5deg); } 50% { transform: rotateY(-180deg) rotate(0deg) scale(1.1); } }
            @keyframes leaf-ans-3 { 0%, 100% { transform: rotate(-10deg) rotateY(-180deg); } 50% { transform: rotate(-20deg) rotateY(-180deg); } }
            @keyframes letter-entrance {
              0% { opacity: 0; transform: translateY(30px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes grow-ans { 0% { transform: scale(0); opacity: 0; } }
            @keyframes light-ans {
              0% { opacity: 0; transform: translateY(0vmin); }
              25% { opacity: 1; transform: translateY(-5vmin) translateX(-2vmin); }
              50% { opacity: 1; transform: translateY(-15vmin) translateX(2vmin); filter: blur(0.2vmin); }
              75% { transform: translateY(-20vmin) translateX(-2vmin); filter: blur(0.2vmin); }
              100% { transform: translateY(-30vmin); opacity: 0; filter: blur(1vmin); }
            }
            @keyframes moving-flower-1 { 0%, 100% { transform: rotate(-12deg); } 50% { transform: rotate(-16deg); } }
            @keyframes moving-flower-2 { 0%, 100% { transform: rotate(2deg); } 50% { transform: rotate(-2deg); } }
            @keyframes moving-flower-3 { 0%, 100% { transform: rotate(12deg); } 50% { transform: rotate(16deg); } }
            @keyframes moving-flower-4 { 0%, 100% { transform: rotate(-26deg); } 50% { transform: rotate(-30deg); } }
            @keyframes moving-flower-5 { 0%, 100% { transform: rotate(26deg); } 50% { transform: rotate(30deg); } }
            @keyframes blooming-leaf-right { 0% { transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0); } }
            @keyframes blooming-leaf-left { 0% { transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0); } }
            @keyframes grow-flower-tree { 0% { height: 0; border-radius: 1vmin; } }
            @keyframes blooming-flower { 0% { transform: scale(0); } }
            @keyframes moving-grass { 0%, 100% { transform: rotate(-48deg) rotateY(40deg); } 50% { transform: rotate(-50deg) rotateY(40deg); } }
            @keyframes moving-grass--2 { 0%, 100% { transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg); } 50% { transform: scale(0.5) rotate(79deg) rotateX(10deg) rotateY(-200deg); } }
            @keyframes growing-grass-ans { 0% { transform: scale(0); } }
            @keyframes flower__g-front-ans { 0%, 100% { transform: rotate(-28deg) rotateY(30deg) scale(1.04); } 50% { transform: rotate(-35deg) rotateY(40deg) scale(1.04); } }
            @keyframes flower-g-right-ans { 0%, 100% { transform: rotate(20deg); } 50% { transform: rotate(24deg) rotateX(-20deg); } }
            @keyframes flower-g-right-ans--2 { 0%, 100% { transform: rotateY(-180deg) rotate(0deg) rotateX(-20deg); } 50% { transform: rotateY(-180deg) rotate(6deg) rotateX(-20deg); } }
            @keyframes flower__g-front__leaf-ans { 0% { transform: rotate(10deg) scale(0); } }
            @keyframes flower__g-front__leaf-left-ans { 0% { transform: rotateY(-180deg) rotate(5deg) scale(0); } }
            @keyframes flower__g-front__leaf-left-ans-2 { 0% { transform: rotateY(-180deg) scale(0); } }
            @keyframes flower__g-fr-leaft-ans-1 { 0% { transform-origin: left; transform: rotate(45deg) scale(0); } }
            @keyframes flower__g-fr-leaft-ans-5 { 0% { transform-origin: left; transform: rotate(55deg) scale(0); } }
            @keyframes flower__g-fr-leaft-ans-6 { 0% { transform-origin: right; transform: rotate(25deg) rotateY(-180deg) scale(0); } }
            @keyframes flower__g-fr-leaft-ans-7 { 0% { transform-origin: left; transform: rotate(45deg) scale(0); } }
            @keyframes flower__g-fr-leaft-ans-8 { 0% { transform-origin: right; transform: rotate(15deg) rotateY(-180deg) scale(0); } }
            @keyframes flower-g-long-ans { 0%, 100% { transform: rotate(-30deg) rotateY(-20deg); } 50% { transform: rotate(-32deg) rotateY(-20deg); } }

            @keyframes growing-grass-ans--1 { 0% { transform-origin: bottom left; transform: rotate(-20deg) scale(0); } }
            @keyframes growing-grass-ans--2 { 0% { transform-origin: bottom right; transform: rotate(10deg) scale(0); } }
            @keyframes growing-grass-ans--3 { 0% { transform-origin: bottom left; transform: rotate(-18deg) rotateX(-20deg) scale(0); } }
            @keyframes growing-grass-ans--4 { 0% { transform-origin: bottom right; transform: rotate(2deg) scale(0); } }
            @keyframes growing-grass-ans--5 { 0% { transform-origin: bottom left; transform: rotate(-24deg) rotateX(-20deg) scale(0); } }
            @keyframes growing-grass-ans--6 { 0% { transform-origin: bottom right; transform: rotate(10deg) scale(0); } }
            @keyframes growing-grass-ans--7 { 0% { transform-origin: bottom left; transform: rotate(-10deg) scale(0); } }
            @keyframes growing-grass-ans--8 { 0% { transform-origin: bottom right; transform: rotate(10deg) scale(0); } }

            @keyframes float-heart {
              0% {
                transform: translateY(0) scale(0.6) rotate(0deg);
                opacity: 0;
              }
              10% {
                opacity: 0.25;
              }
              90% {
                opacity: 0.25;
              }
              100% {
                transform: translateY(-60vh) scale(1.2) rotate(180deg);
                opacity: 0;
              }
            }

            .sealed-letter-modal .animate-float-heart {
              animation: float-heart 8s linear infinite;
            }

            /* Custom scrollbar for letter card */
            .sealed-letter-modal .letter-card::-webkit-scrollbar {
              width: 5px;
            }
            .sealed-letter-modal .letter-card::-webkit-scrollbar-track {
              background: rgba(251, 113, 133, 0.05);
              border-radius: 10px;
            }
            .sealed-letter-modal .letter-card::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, rgba(245, 158, 11, 0.4), rgba(244, 63, 94, 0.4));
              border-radius: 10px;
            }
            .sealed-letter-modal .letter-card::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(to bottom, rgba(245, 158, 11, 0.6), rgba(244, 63, 94, 0.6));
            }

            .sealed-letter-modal.not-loaded * {
              animation-play-state: paused !important;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default SealedLetter;
