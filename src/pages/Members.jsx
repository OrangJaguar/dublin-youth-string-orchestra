import React from 'react';
import ScrollReveal from '../components/animations/ScrollReveal';
import ConductorBios from '../components/members/ConductorBios';

export default function Members() {
  return (
    <div className="bg-[#0a0a0a] pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[#2e8b57] text-sm tracking-[0.3em] uppercase">
              Leadership
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] italic mt-4 mb-6">
              Our Conductors
            </h1>
            <p className="text-[#a1a1a1] max-w-2xl mx-auto text-lg">
              Meet the directors and music educators who lead the Dublin Youth
              String Orchestra.
            </p>
          </div>
        </ScrollReveal>

        <ConductorBios />
      </div>
    </div>
  );
}