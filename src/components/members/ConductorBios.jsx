import React from 'react';
import { motion } from 'framer-motion';
import { conductors } from './SeatingData';
import ScrollReveal from '../animations/ScrollReveal';

export default function ConductorBios() {
  return (
    <div className="space-y-16">
      {conductors.map((conductor, index) => (
        <ScrollReveal key={conductor.id} delay={index * 0.1}>
          <div className="bg-[#161616] border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
              {/* Image */}
              <div className="relative overflow-hidden group/img">
                <motion.img
                  src={conductor.image}
                  alt={conductor.name}
                  className="w-full h-64 lg:h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  whileHover={{ scale: 1.05 }}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="font-serif text-2xl text-white italic mb-1">
                    {conductor.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {conductor.school.split(',')[0]}
                  </p>
                </div>
                {/* Shadow Effect */}
                <div className="absolute inset-0 shadow-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                {/* Name with underline */}
                <h3 className="font-serif text-2xl lg:text-3xl text-[#ededed] italic mb-1 border-b border-[#a1a1a1] pb-2 inline-block">
                  {conductor.name}
                </h3>
                
                {/* School */}
                <p className="text-[#a1a1a1] text-lg mt-3 mb-2">
                  {conductor.school}
                </p>
                
                {/* Degrees */}
                <div className="mb-4 pl-4 border-l-2 border-[#2e8b57]/30">
                  {conductor.degrees.map((degree, i) => (
                    <p key={i} className="text-[#a1a1a1] text-sm italic">
                      {degree}
                    </p>
                  ))}
                </div>
                
                {/* Bio */}
                <div className="text-[#a1a1a1] text-sm leading-relaxed whitespace-pre-line">
                  {conductor.bio}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}