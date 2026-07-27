import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';

export default function TimelineEvent({ event, index, isLeft, isPast }) {
  const isConcert = event.type === 'concert';
  const isBreak = event.type === 'break';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`relative flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'} ${isPast ? 'opacity-50' : ''}`}
    >
      {/* Content Card */}
      <div className={`w-full md:w-[calc(50%-40px)] ${isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div
          whileHover={{ scale: isPast ? 1 : 1.02 }}
          className={`
            p-6 rounded-2xl
            ${isBreak
              ? 'bg-[#0a0a0a] border-2 border-dashed border-[#333]'
              : isConcert 
                ? 'bg-gradient-to-br from-[#2e8b57]/20 to-[#1c1c1c] border border-[#2e8b57]/30' 
                : 'bg-[#1c1c1c] border border-[#333]'
            }
            ${isPast ? 'grayscale' : ''}
          `}
        >
          {/* Date */}
          <div className={`flex items-baseline gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            <span className={`font-serif text-4xl italic ${isPast ? 'text-[#666] line-through' : 'text-[#ededed]'}`}>
              {event.date.split('-')[2]}
            </span>
            <span className={`text-lg ${isPast ? 'text-[#666]' : 'text-[#a1a1a1]'}`}>
              {format(new Date(event.date + 'T12:00:00'), 'MMM yyyy')}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-serif text-xl mt-3 ${isPast ? 'text-[#666] line-through' : isConcert ? 'text-[#2e8b57]' : isBreak ? 'text-[#a1a1a1] italic' : 'text-[#ededed]'}`}>
            {event.title}
          </h3>

          {/* Details */}
          {!isBreak && (
            <div className={`flex items-center gap-4 mt-4 text-sm ${isPast ? 'text-[#666]' : 'text-[#a1a1a1]'} ${isLeft ? 'justify-end' : 'justify-start'} flex-wrap`}>
              {event.time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {event.time}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Center Node */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, delay: index * 0.02 }}
          className={`
            rounded-full
            ${isPast
              ? 'w-3 h-3 bg-[#666]'
              : isBreak
                ? 'w-4 h-4 border-2 border-dashed border-[#666] bg-transparent'
                : isConcert 
                  ? 'w-6 h-6 bg-[#2e8b57] shadow-[0_0_20px_rgba(46,139,87,0.5)]' 
                  : 'w-3 h-3 bg-white'
            }
          `}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-40px)]" />
    </motion.div>
  );
}