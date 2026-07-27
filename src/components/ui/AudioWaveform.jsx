import React from 'react';
import { motion } from 'framer-motion';

export default function AudioWaveform({ isPlaying = false }) {
  const bars = [3, 8, 5, 10, 4, 9, 6, 7];

  return (
    <div className="flex items-center gap-1 h-6">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full"
          style={{
            height: `${height * 2}px`,
            backgroundColor: isPlaying ? '#2e8b57' : '#666'
          }}
          animate={isPlaying ? {
            scaleY: [1, 1.5, 0.8, 1.3, 1],
          } : {}}
          transition={isPlaying ? {
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          } : {}}
        />
      ))}
    </div>
  );
}