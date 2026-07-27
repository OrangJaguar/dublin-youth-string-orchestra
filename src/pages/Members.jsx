import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/animations/ScrollReveal';
import SeatingChartSVG from '../components/members/SeatingChartSVG';
import SeatingList from '../components/members/SeatingList';
import ConductorBios from '../components/members/ConductorBios';

export default function Members() {
  return (
    <div className="bg-[#0a0a0a] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase"
            >
              The Orchestra
            </motion.span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] italic mt-4 mb-6">
              Interactive Seating Chart
            </h1>
            <p className="text-[#a1a1a1] max-w-2xl mx-auto text-lg">
              Hover over a seat to see the section. 
              Members with a{' '}
              <span className="text-[#FFD700] font-medium">gold border</span>
              {' '}are Rehearsal Assistants.
            </p>
          </div>
        </ScrollReveal>

        {/* Coming Soon Message */}
        <ScrollReveal delay={0.2}>
          <div className="mb-32 text-center py-20">
            <div className="bg-[#1c1c1c] border border-[#333] rounded-2xl p-12 max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl text-[#ededed] italic mb-4">Coming Soon</h2>
              <p className="text-[#a1a1a1] text-lg">
                The interactive seating chart is currently being updated. Check back soon!
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="relative py-16">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#333] to-transparent" />
        </div>

        {/* Conductor Bios */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase">
              Leadership
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#ededed] italic mt-4">
              Our Conductors
            </h2>
          </div>
        </ScrollReveal>

        <ConductorBios />
      </div>
    </div>
  );
}