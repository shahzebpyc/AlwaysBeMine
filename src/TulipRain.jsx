import React, { useEffect, useState } from "react";

const TulipRain = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const symbols = ["🌷", "🌸", "🌷", "✨", "💕"];

    const items = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      y: -10 - Math.random() * 20, // initial top position offscreen
      size: Math.random() * 1.5 + 0.8, // scale size
      duration: Math.random() * 8 + 6, // speed of falling
      delay: Math.random() * -15, // negative delay so they start scattered
      spin: Math.random() * 360,
      sway: Math.random() * 20 + 10, // amount of sway
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.4 + 0.5,
    }));

    setPetals(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}vh`,
            fontSize: `${petal.size}rem`,
            opacity: petal.opacity,
            animation: `fall-${petal.id} ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          {petal.symbol}
          <style>{`
            @keyframes fall-${petal.id} {
              0% {
                transform: translateY(0vh) rotate(${petal.spin}deg) translateX(0px);
              }
              50% {
                transform: translateY(50vh) rotate(${petal.spin + 180}deg) translateX(${petal.sway}px);
              }
              100% {
                transform: translateY(115vh) rotate(${petal.spin + 360}deg) translateX(0px);
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};

export default TulipRain;
