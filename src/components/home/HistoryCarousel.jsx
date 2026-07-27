import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const historyData = [
  {
    year: '1999',
    event: 'DYSO Founded',
    description: 'Mr. Matthew Hawley founded the Dublin Youth String Orchestra with just 15 passionate young musicians.'
  },
  {
    year: '2005',
    event: 'First OMEA Performance',
    description: 'The orchestra earned its first Superior rating at the OMEA State Conference, establishing a tradition of excellence.'
  },
  {
    year: '2010',
    event: 'Expanded to 40 Members',
    description: 'Growing reputation led to increased membership, requiring larger venues and more challenging repertoire.'
  },
  {
    year: '2015',
    event: 'ASTA National Festival',
    description: 'DYSO performed at the prestigious ASTA National Orchestra Festival, representing Ohio on the national stage.'
  },
  {
    year: '2020',
    event: 'Virtual Performances',
    description: 'Despite challenges, the orchestra adapted with innovative virtual concerts, keeping music alive for the community.'
  },
  {
    year: '2024',
    event: '25th Anniversary Season',
    description: 'Celebrating over two decades of nurturing young musicians and enriching the Dublin community through music.'
  }
];

export default function HistoryCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center text-[#ededed] hover:border-[#FFD700] hover:text-[#FFD700] transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center text-[#ededed] hover:border-[#FFD700] hover:text-[#FFD700] transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide px-12 py-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {historyData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[350px] snap-center"
          >
            <div className="relative bg-[#1c1c1c] border border-[#333] rounded-2xl p-8 h-full">
              {/* Timeline Dot */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFD700] border-4 border-[#0a0a0a]" />
              
              {/* Year - Large Gold Typography */}
              <h3 className="font-serif text-6xl text-[#FFD700] italic mb-2">
                {item.year}
              </h3>
              
              {/* Event Title */}
              <h4 className="text-[#ededed] font-semibold text-xl mb-4">
                {item.event}
              </h4>
              
              {/* Description */}
              <p className="text-[#a1a1a1] leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#333] to-transparent pointer-events-none" />
    </div>
  );
}