import React from 'react';
import { motion } from 'framer-motion';

export default function StringsAnimation() {
  const strings = [0, 1, 2, 3];
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {/* Animated string lines */}
      <svg 
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {strings.map((i) => (
          <motion.path
            key={i}
            d={`M 0 ${150 + i * 80} Q 50% ${130 + i * 80} 100% ${150 + i * 80}`}
            fill="none"
            stroke="#2e8b57"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: 1,
              d: [
                `M 0 ${150 + i * 80} Q 50% ${130 + i * 80} 100% ${150 + i * 80}`,
                `M 0 ${150 + i * 80} Q 50% ${170 + i * 80} 100% ${150 + i * 80}`,
                `M 0 ${150 + i * 80} Q 50% ${130 + i * 80} 100% ${150 + i * 80}`,
              ]
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              d: { 
                duration: 2 + i * 0.3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }
            }}
          />
        ))}
      </svg>

      {/* Floating music notes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#2e8b57] text-2xl"
          initial={{ 
            x: Math.random() * 100 + '%',
            y: '110%',
            opacity: 0,
            rotate: Math.random() * 30 - 15
          }}
          animate={{ 
            y: '-10%',
            opacity: [0, 0.6, 0.6, 0],
            rotate: Math.random() * 60 - 30
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
        >
          ♪
        </motion.div>
      ))}
    </div>
  );
}