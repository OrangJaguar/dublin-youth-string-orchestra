import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'Schedule', page: 'Schedule' },
  { name: 'Members', page: 'Members' },
  { name: 'Listen', page: 'Listen' },
  { name: 'Audition', page: 'Audition' },
  { name: 'Contact', page: 'Contact' },
];

export default function GlassHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Get current page name from URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/Home') return 'Home';
    return path.replace('/', '');
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`
          relative w-full z-30
          backdrop-blur-xl bg-black/50
          border-b border-gradient
          transition-all duration-500
          ${scrolled ? 'py-3' : 'py-5'}
        `}
        style={{
          borderImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent) 1',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f197e26113f0f983a7a02/f6b20e4fd_DysoLogoWhite.png"
              alt="DYSO Logo"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <Link
                  key={link.name}
                  to={createPageUrl(link.page)}
                  className={`
                    text-sm tracking-wide transition-colors duration-300 relative group
                    ${isActive ? 'text-[#2e8b57]' : 'text-[#a1a1a1] hover:text-[#ededed]'}
                  `}
                >
                  {link.name}
                  {/* Hover underline */}
                  <span className={`
                    absolute -bottom-1 left-0 h-px bg-[#2e8b57] transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link to={createPageUrl('Audition')}>
              <MagneticButton variant="primary">
                Audition
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#ededed] p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-xl px-6 pt-32 lg:hidden overflow-y-auto"
            >
            <nav className="flex flex-col gap-8 pb-8">
              {navLinks.map((link, i) => {
                const isActive = currentPage === link.page;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={createPageUrl(link.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        text-2xl md:text-3xl font-serif italic tracking-wide flex items-center gap-4
                        ${isActive ? 'text-[#2e8b57]' : 'text-[#ededed]'}
                      `}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#2e8b57]" />}
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link to={createPageUrl('Audition')} onClick={() => setMobileMenuOpen(false)}>
                  <MagneticButton variant="primary" className="w-full">
                    Audition Now
                  </MagneticButton>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}