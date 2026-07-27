import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import StringsAnimation from './StringsAnimation';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Video Background with Vignette */}
      <div className="absolute inset-0">
        {/* Placeholder for video - using gradient animation as placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] via-[#0a0a0a] to-[#1c1c1c]">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 30% 50%, rgba(46,139,87,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 50%, rgba(46,139,87,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 50%, rgba(46,139,87,0.1) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>
        
        {/* String Orchestra Animation */}
        <StringsAnimation />
        
        {/* Vignette Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.8) 70%, rgba(10,10,10,1) 100%)'
          }}
        />
        
        {/* Grain texture */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#ededed] italic tracking-tight mb-6">
            Excellence in Motion.
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[#a1a1a1] text-lg md:text-xl tracking-[0.3em] uppercase"
          >
            Dublin Youth String Orchestra
          </motion.p>
        </motion.div>

        {/* Decorative lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[80vw] max-w-4xl h-px bg-gradient-to-r from-transparent via-[#2e8b57]/30 to-transparent"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#a1a1a1] text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-[#a1a1a1]" />
        </motion.div>
      </motion.div>
    </section>
  );
}