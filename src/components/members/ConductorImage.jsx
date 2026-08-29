import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

function getInitials(name) {
  const titles = ['mr', 'mrs', 'ms', 'dr', 'mr.', 'mrs.', 'ms.', 'dr.'];
  const words = name.split(/\s+/).filter(w => !titles.includes(w.toLowerCase()));
  const first = words[0]?.[0] ?? '';
  const last = words[words.length - 1]?.[0] ?? '';
  return (first + last).toUpperCase();
}

export default function ConductorImage({ conductor }) {
  const [error, setError] = useState(false);

  const Placeholder = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-[#1c1c1c] via-[#161616] to-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle staff-line texture */}
      <div className="absolute inset-0 opacity-[0.15]">
        {[35, 42, 49, 56, 63].map((top) => (
          <div key={top} className="absolute left-0 right-0 h-px bg-[#2e8b57]" style={{ top: `${top}%` }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <span className="font-serif text-6xl text-[#ededed]/80 italic tracking-wider relative z-10">
        {getInitials(conductor.name)}
      </span>
      <Music className="w-5 h-5 text-[#2e8b57]/70 mt-3 relative z-10" />
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#a1a1a1]/60 mt-4 relative z-10">
        Photo Coming Soon
      </span>
    </div>
  );

  if (error || !conductor.image) return <Placeholder />;

  return (
    <motion.img
      src={conductor.image}
      alt={conductor.name}
      onError={() => setError(true)}
      className="w-full h-64 lg:h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
      whileHover={{ scale: 1.05 }}
    />
  );
}