import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // ISO date string or similar format
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  if (timeLeft.isOver) {
    return (
      <div className="text-center py-6">
        <p className="font-serif text-2xl text-amber-600 font-light tracking-wider animate-pulse">
          Trân Trọng Đón Tiếp Quý Khách!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 py-6 px-2">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[85px] h-20 sm:h-24 rounded-2xl bg-stone-50 border border-amber-100 shadow-sm relative overflow-hidden group"
        >
          {/* Subtle hover background effect */}
          <div className="absolute inset-0 bg-amber-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="font-serif text-2xl sm:text-3xl font-light text-stone-800 z-10">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs tracking-widest text-stone-400 uppercase mt-1 z-10">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
