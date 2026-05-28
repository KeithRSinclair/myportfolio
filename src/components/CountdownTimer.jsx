import React, { useEffect, useState } from "react";

const DEFAULT_TARGET = "2026-06-11T00:00:00"; // Portfolio Launch target: June 11, 2026 00:00:00

function getTimeRemaining(target) {
  const total = Math.max(0, target - new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

export default function CountdownTimer({ targetDate = DEFAULT_TARGET }) {
  // Accept either Date object or parsable date string
  const target = React.useMemo(() => {
    const d = targetDate instanceof Date ? targetDate : new Date(targetDate);
    if (isNaN(d)) {
      console.warn("CountdownTimer: invalid targetDate, falling back to default.");
      return new Date(DEFAULT_TARGET);
    }
    return d;
  }, [targetDate]);

  const [time, setTime] = useState(() => getTimeRemaining(target));
  const [finished, setFinished] = useState(time.total === 0);

  useEffect(() => {
    let id;
    const tick = () => {
      const t = getTimeRemaining(target);
      setTime(t);
      if (t.total === 0) {
        setFinished(true);
        if (id) clearInterval(id);
      }
    };

    // run immediately then every second
    tick();
    id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  // helper to zero-pad numbers
  const pad = (n, width = 2) => String(n).padStart(width, "0");

  // neon color for inline styles (Tailwind doesn't support text-shadow directly)
  const neon = "#39FF14"; // neon green — change to #FF5733 for bright orange

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!finished ? (
        <div className="flex flex-col items-center gap-6 px-4 sm:px-0">
          <div className="flex items-stretch justify-center gap-3 sm:gap-8 flex-nowrap overflow-x-auto">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div
                className="w-20 sm:w-32 md:w-44 h-16 sm:h-20 md:h-28 flex items-center justify-center bg-black/90 border border-gray-800 rounded-xl shadow-2xl"
                style={{ boxShadow: `0 0 12px ${neon}44` }}
              >
                <span
                  className="font-mono text-xl sm:text-3xl md:text-5xl text-[#39FF14]"
                  style={{ textShadow: `0 0 7px ${neon}, 0 0 20px ${neon}90` }}
                >
                  {pad(time.days, 2)}
                </span>
              </div>
              <div className="text-xs sm:text-base text-gray-300 mt-2 sm:mt-3 text-center">Days</div>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-28 md:w-40 h-16 sm:h-20 md:h-28 flex items-center justify-center bg-black/90 border border-gray-800 rounded-xl shadow-2xl"
                style={{ boxShadow: `0 0 12px ${neon}44` }}>
                <span className="font-mono text-xl sm:text-3xl md:text-5xl text-[#39FF14]"
                  style={{ textShadow: `0 0 7px ${neon}, 0 0 20px ${neon}90` }}>
                  {pad(time.hours)}
                </span>
              </div>
              <div className="text-xs sm:text-base text-gray-300 mt-2 sm:mt-3">Hours</div>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-28 md:w-40 h-16 sm:h-20 md:h-28 flex items-center justify-center bg-black/90 border border-gray-800 rounded-xl shadow-2xl"
                style={{ boxShadow: `0 0 12px ${neon}44` }}>
                <span className="font-mono text-xl sm:text-3xl md:text-5xl text-[#39FF14]"
                  style={{ textShadow: `0 0 7px ${neon}, 0 0 20px ${neon}90` }}>
                  {pad(time.minutes)}
                </span>
              </div>
              <div className="text-xs sm:text-base text-gray-300 mt-2 sm:mt-3">Minutes</div>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-16 sm:w-28 md:w-40 h-16 sm:h-20 md:h-28 flex items-center justify-center bg-black/90 border border-gray-800 rounded-xl shadow-2xl"
                style={{ boxShadow: `0 0 12px ${neon}44` }}>
                <span className="font-mono text-xl sm:text-3xl md:text-5xl text-[#39FF14]"
                  style={{ textShadow: `0 0 7px ${neon}, 0 0 20px ${neon}90` }}>
                  {pad(time.seconds)}
                </span>
              </div>
              <div className="text-xs sm:text-base text-gray-300 mt-2 sm:mt-3">Seconds</div>
            </div>
          </div>

          <div className="text-sm text-gray-400 mt-2 text-center">Until initial release</div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div
            className="font-mono text-3xl sm:text-4xl md:text-5xl text-[#39FF14] bg-black/90 px-8 py-5 rounded-xl border border-gray-800"
            style={{ textShadow: `0 0 8px ${neon}, 0 0 26px ${neon}90`, boxShadow: `0 0 16px ${neon}44` }}
          >
            Portfolio Live!
          </div>
          <div className="text-sm sm:text-base text-gray-400">The portfolio is now live.</div>
        </div>
      )}
    </div>
  );
}
