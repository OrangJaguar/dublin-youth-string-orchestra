import React from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import ScrollReveal from '../components/animations/ScrollReveal';
import TimelineEvent from '../components/schedule/TimelineEvent';

export default function Schedule() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const data = await base44.entities.Event.list('order');
      return data;
    },
  });

  const scrollToEvent = (eventId) => {
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      const yOffset = -150;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const nextEvent = events.find(e => {
    const eventDate = new Date(e.date + 'T12:00:00');
    eventDate.setHours(0, 0, 0, 0);
    return !e.is_tbd && eventDate >= today && e.type !== 'break';
  });
  
  const nextConcert = events.find(e => {
    const eventDate = new Date(e.date + 'T12:00:00');
    eventDate.setHours(0, 0, 0, 0);
    return !e.is_tbd && e.type === 'concert' && eventDate >= today;
  });

  if (isLoading) {
    return (
      <div className="bg-[#0a0a0a] pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="text-[#a1a1a1]">Loading schedule...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase">
              2026-2027 Season
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] italic mt-4 mb-6">
              The Timeline
            </h1>
            <p className="text-[#a1a1a1] max-w-xl mx-auto mb-8">
              From weekly rehearsals to grand performances, follow our journey through the season.
            </p>
            
            {/* Quick Navigation Buttons */}
            {(nextEvent || nextConcert) && (
              <div className="flex flex-wrap justify-center gap-3">
                {nextEvent && (
                  <button
                    onClick={() => scrollToEvent(nextEvent.id)}
                    className="px-6 py-3 bg-[#1c1c1c] hover:bg-[#2e8b57]/20 border border-[#333] hover:border-[#2e8b57] text-[#ededed] rounded-lg transition-all text-sm font-medium"
                  >
                    Jump to Next Event
                  </button>
                )}
                {nextConcert && (
                  <button
                    onClick={() => scrollToEvent(nextConcert.id)}
                    className="px-6 py-3 bg-[#1c1c1c] hover:bg-[#2e8b57]/20 border border-[#333] hover:border-[#2e8b57] text-[#ededed] rounded-lg transition-all text-sm font-medium"
                  >
                    Jump to Next Concert
                  </button>
                )}
              </div>
            )}
            {!nextEvent && !nextConcert && events.length > 0 && (
              <div className="text-center text-[#a1a1a1] text-sm">
                All events for this season have passed. See you next year!
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Animated */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-[#333] via-[#333] to-transparent hidden md:block"
          />

          {/* Events */}
          <div className="space-y-12 md:space-y-8">
            {events.map((event, index) => {
              const eventDate = new Date(event.date + 'T12:00:00');
              eventDate.setHours(0, 0, 0, 0);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isPast = !event.is_tbd && eventDate < today;
              
              return (
                <div key={event.id} id={`event-${event.id}`}>
                  <TimelineEvent 
                    event={event} 
                    index={index}
                    isLeft={index % 2 === 0}
                    isPast={isPast}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-20 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-white" />
            <span className="text-[#a1a1a1] text-sm">Rehearsal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#2e8b57] shadow-[0_0_10px_rgba(46,139,87,0.5)]" />
            <span className="text-[#a1a1a1] text-sm">Concert</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#666]" />
            <span className="text-[#666] text-sm line-through">Past Event</span>
          </div>
        </div>
      </div>
    </div>
  );
}