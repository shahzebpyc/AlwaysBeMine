import React, { useState } from "react";

const VOUCHERS = [
  {
    id: 1,
    emoji: "📜",
    title: "The Mohtarma's Decree",
    frontText: "Voucher for 1 Absolute Command",
    description: "This ticket grants the Mohtarma one free pass to command Shahzeb to do anything, no questions asked!",
    backText: "Redeemed! 📜 Screenshot this card and send it to Shahzeb to claim your decree immediately.",
    colorTheme: "from-amber-500/30 to-rose-600/30 border-amber-400/50",
    buttonColor: "bg-amber-500 hover:bg-amber-600",
  },
  {
    id: 2,
    emoji: "🍽️",
    title: "Mohtarma Special Date Night",
    frontText: "Voucher for a Dream Date",
    description: "Good for one custom-tailored date night to your favorite restaurant, including dessert and late-night talks.",
    backText: "Redeemed! 🍽️ Reservation pending. Shahzeb will plan the perfect evening for you.",
    colorTheme: "from-pink-400/30 to-rose-500/30 border-pink-300/50",
    buttonColor: "bg-pink-500 hover:bg-pink-600",
  },
  {
    id: 3,
    emoji: "🍦",
    title: "Late Night Ice Cream & Chai",
    frontText: "Voucher for Late Night Cravings",
    description: "Valid for an emergency snack, chai, or ice cream run at any hour of the night, whenever you say the word.",
    backText: "Redeemed! 🚗 Shahzeb is on his way with your favorite treats.",
    colorTheme: "from-sky-400/30 to-teal-500/30 border-sky-300/50",
    buttonColor: "bg-sky-500 hover:bg-sky-600",
  },
  {
    id: 4,
    emoji: "🧸",
    title: "Unlimited Comfort",
    frontText: "Voucher for Unlimited Comfort",
    description: "Need a pick-me-up or a reassuring conversation after a long, stressful day? Redeem this for undivided attention and comfort from Shahzeb.",
    backText: "Redeemed! ❤️ Shahzeb is all ears and ready to bring comfort to his Mohtarma.",
    colorTheme: "from-violet-400/30 to-purple-600/30 border-violet-300/50",
    buttonColor: "bg-violet-500 hover:bg-violet-600",
  },
];

const LoveVouchers = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const handleRedeem = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <div className="w-full max-w-5xl px-4 py-8 z-20">
      <h2 className="text-2xl md:text-3xl text-center text-rose-500 font-bold mb-2" style={{ fontFamily: "Charm, serif" }}>
        Your Keepsake Vouchers
      </h2>
      <p className="text-center text-sm text-stone-600 mb-8 max-w-md mx-auto">
        Some special promises and sweet privileges just for you, Mohtarma. Go ahead, flip and claim them whenever you&apos;d like! ✨💖
      </p>

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-6 px-4 py-4 scrollbar-thin scrollbar-thumb-rose-200/50 snap-x justify-start md:justify-center">
        {VOUCHERS.map((voucher) => {
          const isFlipped = !!flippedCards[voucher.id];

          return (
            <div
              key={voucher.id}
              className="w-72 h-96 flex-shrink-0 snap-center [perspective:1000px]"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* CARD FRONT */}
                <div
                  className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl bg-gradient-to-br ${voucher.colorTheme} backdrop-blur-md border p-6 flex flex-col justify-between shadow-2xl`}
                >
                  <div>
                    <div className="text-4xl mb-4 text-center">{voucher.emoji}</div>
                    <h3 className="text-xl font-bold text-stone-800 text-center mb-2" style={{ fontFamily: "Charm, serif" }}>
                      {voucher.title}
                    </h3>
                    <p className="text-center text-xs font-semibold uppercase tracking-wider text-rose-500/80 mb-4">
                      {voucher.frontText}
                    </p>
                    <p className="text-stone-700 text-sm text-center leading-relaxed">
                      {voucher.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeem(voucher.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all duration-300 transform active:scale-95 ${voucher.buttonColor}`}
                  >
                    Claim Voucher
                  </button>
                </div>

                {/* CARD BACK */}
                <div
                  className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-stone-900/90 border border-stone-800/80 p-6 flex flex-col justify-center items-center shadow-2xl`}
                >
                  <div className="text-5xl mb-4 animate-bounce">💖</div>
                  <h4 className="text-lg font-bold text-rose-400 mb-4" style={{ fontFamily: "Charm, serif" }}>
                    Redeemed!
                  </h4>
                  <p className="text-stone-300 text-sm text-center leading-relaxed font-serif px-2">
                    {voucher.backText}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoveVouchers;
