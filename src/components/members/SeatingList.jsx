import React from 'react';
import { motion } from 'framer-motion';
import { seats, sectionLabelColors } from './SeatingData';

export default function SeatingList() {
  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.section]) acc[seat.section] = [];
    acc[seat.section].push(seat);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedSeats).map(([section, sectionSeats], sectionIndex) => (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <h3 
            className="text-lg font-medium mb-4 flex items-center gap-3"
          >
            <div 
              className="w-4 h-4 rounded-full bg-[#2d2d2d] border border-[#444]"
            />
            <span style={{ color: sectionLabelColors[section] }}>{section}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sectionSeats.map((seat) => (
              <div 
                key={seat.id}
                className={`
                  p-4 rounded-xl bg-[#1c1c1c] border
                  ${seat.isRA ? 'border-[#FFD700]/50' : 'border-[#333]'}
                `}
                style={{
                  boxShadow: seat.isRA ? '0 0 8px rgba(255, 215, 0, 0.15)' : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#ededed]">{seat.name}</span>
                  {seat.isRA && (
                    <span className="text-[#FFD700] text-xs font-medium px-2 py-1 bg-[#FFD700]/10 rounded-full">
                      RA
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}