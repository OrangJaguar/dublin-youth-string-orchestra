import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { MapPin } from 'lucide-react';

export default function CountdownBanner() {
  const { data: settings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const data = await base44.entities.SiteSettings.list();
      return data[0] || {
        banner_enabled: true,
        banner_text: 'NEXT CONCERT: GCCC 2PM',
        banner_location: '@ GCCC Room A210-215',
        countdown_date: '2026-01-29T14:00:00-05:00'
      };
    },
  });

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = settings ? new Date(settings.countdown_date) : new Date('2026-03-17T19:00:00-04:00');
      const difference = targetDate - new Date();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [settings?.countdown_date]);

  if (!settings?.banner_enabled) {
    return null;
  }

  return (
    <div className="relative w-full z-50 bg-[#2e8b57] text-white py-1 md:py-2 px-3 md:px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-[10px] md:text-sm">
        {/* Left Side - Compact on mobile */}
        <div className="flex items-center gap-1 md:gap-2">
          <span className="font-bold tracking-wide uppercase whitespace-nowrap">
            {settings.banner_text}
          </span>
          <span className="hidden md:inline text-xs opacity-80">{settings.banner_location}</span>
        </div>

        {/* Right Side - Countdown - Inline on mobile */}
        <div className="flex items-center gap-1 md:gap-3 font-mono">
          <span className="font-bold">{String(timeLeft.days).padStart(2, '0')}d</span>
          <span>:</span>
          <span className="font-bold">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span>:</span>
          <span className="font-bold">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span className="hidden md:inline">:</span>
          <span className="font-bold hidden md:inline">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </div>
    </div>
  );
}