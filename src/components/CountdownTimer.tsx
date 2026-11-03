import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO string
  eventTitle: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, eventTitle }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="text-center py-3 text-sm text-slate-500">
        {eventTitle} celebration has commenced.
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 text-white rounded-2xl p-6 sm:p-7 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Mission Trajectory Countdown</span>
          </span>
          <h4 className="text-xl font-extrabold text-white mt-1">{eventTitle}</h4>
          <p className="text-xs text-slate-400 mt-1">Commencing 18 February 2027 at SATI Vidisha Station Coordinates</p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 font-mono tabular-nums">
          <div className="flex flex-col items-center bg-slate-950/90 border border-cyan-500/30 rounded-xl px-3.5 py-2.5 min-w-[70px] shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-sans mt-0.5 font-medium">Days</span>
          </div>
          <span className="text-xl font-bold text-cyan-500/60">:</span>
          <div className="flex flex-col items-center bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 min-w-[70px] shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-sans mt-0.5 font-medium">Hours</span>
          </div>
          <span className="text-xl font-bold text-cyan-500/60">:</span>
          <div className="flex flex-col items-center bg-slate-950/90 border border-slate-800 rounded-xl px-3.5 py-2.5 min-w-[70px] shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-sans mt-0.5 font-medium">Mins</span>
          </div>
          <span className="text-xl font-bold text-cyan-500/60">:</span>
          <div className="flex flex-col items-center bg-slate-950/90 border border-amber-500/30 rounded-xl px-3.5 py-2.5 min-w-[70px] shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-sans mt-0.5 font-medium">Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
