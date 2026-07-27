import React from 'react';
import { motion } from 'framer-motion';

const marqueeItems = [
  "GRADES 5-9",
  "•",
  "AWARD WINNING",
  "•",
  "OMEA PERFORMERS",
  "•",
  "EXCELLENCE IN MOTION",
  "•",
  "DUBLIN'S PREMIER YOUTH ORCHESTRA",
  "•",
];

export default function MarqueeFooter() {
  return (
    <section className="bg-[#0a0a0a] py-12 overflow-hidden border-t border-[#1c1c1c]">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mr-8">
            {marqueeItems.map((item, j) => (
              <span 
                key={j} 
                className={`text-xl md:text-2xl tracking-widest ${
                  item === "•" 
                    ? "text-[#2e8b57]" 
                    : "text-[#a1a1a1] font-light"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}