import React from 'react';
import HeroSection from '../components/home/HeroSection';
import MissionGrid from '../components/home/MissionGrid';
import HistorySection from '../components/home/HistorySection';
import MarqueeFooter from '../components/home/MarqueeFooter';

export default function Home() {
  return (
    <div className="bg-[#0a0a0a]">
      <HeroSection />
      <MissionGrid />
      <HistorySection />
      <MarqueeFooter />
    </div>
  );
}