import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Heart, ArrowRight } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

export default function MissionGrid() {
  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const data = await base44.entities.Event.list('order');
      return data;
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const nextConcert = events.find(e => {
    const eventDate = new Date(e.date + 'T12:00:00');
    eventDate.setHours(0, 0, 0, 0);
    return e.type === 'concert' && eventDate >= today;
  });

  const formatConcertDate = (dateStr) => {
    if (!dateStr) return { day: '--', month: 'TBA', year: '' };
    const date = new Date(dateStr + 'T12:00:00');
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };
  };

  const concertDate = formatConcertDate(nextConcert?.date);

  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl text-[#ededed] italic mb-16 text-center">
            Our Mission
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Card 1 - Large, spans 2 cols */}
          <ScrollReveal delay={0.1} className="lg:col-span-2 lg:row-span-2">
            <Link to={createPageUrl('Members')}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative h-full min-h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80"
                  alt="Orchestra"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif text-3xl md:text-4xl text-[#ededed] italic mb-2">
                    Join the Legacy
                  </h3>
                  <p className="text-[#a1a1a1] mb-4 max-w-md">
                    Be part of Dublin's premier youth string ensemble, nurturing the next generation of musicians.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#2e8b57] group-hover:gap-4 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>

          {/* Card 2 - Next Concert */}
          <ScrollReveal delay={0.2}>
            <Link to={createPageUrl('Schedule')}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="h-full min-h-[280px] rounded-2xl bg-gradient-to-br from-[#2e8b57] to-[#1a5233] p-8 flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white/80" />
                  <span className="text-white/80 text-sm tracking-wide uppercase">Next Concert</span>
                </div>
                <div>
                  <p className="text-7xl font-serif text-white italic mb-2">{concertDate.day}</p>
                  <p className="text-2xl text-white/90">{concertDate.month}</p>
                  <p className="text-white/60 mt-2">{nextConcert?.location || 'TBA'}</p>
                </div>
              </motion.div>
            </Link>
          </ScrollReveal>

          {/* Card 3 - Support Us */}
          <ScrollReveal delay={0.3}>
            <Link to={createPageUrl('Contact')}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="h-full min-h-[280px] rounded-2xl bg-[#1c1c1c] border border-[#333] p-8 flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#a1a1a1]" />
                  <span className="text-[#a1a1a1] text-sm tracking-wide uppercase">Support</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#ededed] italic mb-3">
                    Nurture Young Talent
                  </h3>
                  <p className="text-[#a1a1a1] text-sm">
                    Your support enables instruments, education, and opportunities for aspiring musicians.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-[#2e8b57] group-hover:gap-4 transition-all mt-4">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}