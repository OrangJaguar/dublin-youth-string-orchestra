import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';
import HistoryCarousel from './HistoryCarousel';
import { Trophy, Music, Users, Calendar } from 'lucide-react';

export default function HistorySection() {
  const achievements = [
    { icon: Trophy, value: "OMEA", label: "Superior Ratings" },
    { icon: Music, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "500+", label: "Alumni" },
    { icon: Calendar, value: "50+", label: "Annual Performances" }
  ];

  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* History Carousel */}
          <ScrollReveal>
            <div>
              <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase block mb-4">
                Our Legacy
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#ededed] italic mb-8">
                A Tradition of Excellence
              </h2>
              
              <HistoryCarousel />
            </div>
          </ScrollReveal>

          {/* Achievements Grid */}
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-[#1c1c1c] rounded-2xl p-8 border border-[#333] text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2e8b57]/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[#2e8b57]" />
                  </div>
                  <p className="font-serif text-3xl text-[#ededed] italic mb-2">{item.value}</p>
                  <p className="text-[#a1a1a1] text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}