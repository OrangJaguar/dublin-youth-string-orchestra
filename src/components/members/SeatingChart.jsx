import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { seats, sectionColors, sectionLabelColors } from './SeatingData';

export default function SeatingChart() {
  const [hoveredSeat, setHoveredSeat] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (seat, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setHoveredSeat(seat);
  };

  return (
    <div className="relative w-full bg-[#0a0a0a] rounded-xl shadow-sm border border-[#1c1c1c] p-8 overflow-hidden min-h-[800px]">
      
      {/* Top Instruction Text */}
      <div className="text-center mb-8">
        <p className="text-[#a1a1a1] font-medium">
          Hover over any seat to see the musician's name and instrument. Members with a <span className="text-[#2e8b57] font-bold">green border</span> are Rehearsal Assistants.
        </p>
      </div>

      {/* Conductor Box - Target Style (Dark Rectangle) */}
      <div className="flex justify-center mb-4">
        <div className="w-40 h-16 bg-[#1a202c] rounded-lg shadow-lg flex items-center justify-center border-b-4 border-gray-700 z-10">
          <span className="text-white text-sm font-bold uppercase tracking-widest">Conductor</span>
        </div>
      </div>

      {/* Orchestra Layout Container */}
      <div className="relative max-w-5xl mx-auto h-[500px]">
          {seats.map((seat) => {
            // Get colors from our new pastel palette
            const colors = sectionColors[seat.section];
            
            // RA Logic: Thick green border if RA, otherwise subtle specific border
            const borderClass = seat.isRA 
              ? 'border-2 border-[#2e8b57] shadow-md' 
              : `border-2 border-[${colors.border}]`;
            
            // Inline style for border color fallback if Tailwind JIT misses dynamic values
            const borderStyle = seat.isRA 
              ? { borderColor: '#2e8b57' }
              : { borderColor: colors.border };

            return (
              <motion.div
                key={seat.id}
                onMouseEnter={(e) => handleMouseEnter(seat, e)}
                onMouseLeave={() => setHoveredSeat(null)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: seat.id * 0.01 }}
                whileHover={{ scale: 1.15, zIndex: 50 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${seat.x}%`,
                  top: `${seat.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Seat Shape - Square with rounded corners */}
                <div 
                  className={`
                    w-12 h-12 rounded-md
                    ${borderClass}
                    transition-all duration-200
                    flex items-center justify-center
                  `}
                  style={{
                    backgroundColor: colors.bg,
                    ...borderStyle
                  }}
                >
                  {/* Optional: Inner shadow for depth */}
                  <div className="w-full h-full opacity-10 bg-gradient-to-br from-white to-black rounded-md" />
                </div>
              </motion.div>
            );
          })}
      </div>

      {/* Tooltip */}
      {hoveredSeat && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed z-[100] bg-[#1c1c1c] text-[#ededed] px-4 py-3 rounded-lg shadow-xl border border-[#333] pointer-events-none"
          style={{
            left: `${hoverPosition.x}px`,
            top: `${hoverPosition.y - 10}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <p className="font-bold text-lg">{hoveredSeat.name}</p>
          <p className="text-[#a1a1a1] text-sm font-medium">{hoveredSeat.section}</p>
          {hoveredSeat.isRA && (
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#2e8b57] bg-[#2e8b57]/20 px-2 py-1 rounded-full w-fit">
              <span>★ Rehearsal Assistant</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-12 pt-8 border-t border-[#1c1c1c] flex flex-wrap justify-center gap-8">
        {/* Sections */}
        {Object.entries(sectionLabelColors).map(([section, color]) => (
          <div key={section} className="flex items-center gap-3">
            <div 
              className="w-6 h-6 rounded border-2 border-[#333] shadow-sm" 
              style={{ backgroundColor: color }}
            />
            <span className="text-[#a1a1a1] text-sm font-medium">{section}</span>
          </div>
        ))}
        
        {/* RA Legend Item */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#1c1c1c]">
          <div className="w-6 h-6 rounded bg-transparent border-2 border-[#2e8b57]" />
          <span className="text-[#a1a1a1] text-sm font-medium">Rehearsal Assistant</span>
        </div>
      </div>
    </div>
  );
}