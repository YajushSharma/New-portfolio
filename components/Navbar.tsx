import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'longform', label: 'Long Form' },
  { id: 'features', label: 'Why Us' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'about', label: 'About' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Simple Scroll Spy
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200; // Adjusted offset for spy

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for floating navbar
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className={`fixed top-4 md:top-6 left-0 right-0 z-50 mx-auto w-[90%] md:w-[85%] max-w-5xl transition-all duration-500 border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden ${mobileMenuOpen ? 'rounded-[2rem] bg-black/95' : 'rounded-full'}`}
      >
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50 pointer-events-none" />
        
        <div className="px-6 md:px-8 h-16 md:h-20 flex items-center justify-between relative z-10">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold tracking-tighter text-white cursor-pointer select-none" onClick={() => scrollToSection('hero')}>
            RAZEX<span className="text-brand-primary">EDITS</span>.
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors rounded-full
                  ${activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-white'}
                `}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
            >
              Contact Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`py-3 px-4 rounded-lg text-left font-medium text-lg ${activeSection === item.id ? 'text-brand-primary bg-white/5' : 'text-slate-400'}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 bg-brand-primary text-white py-3 rounded-lg font-bold shadow-lg shadow-brand-primary/20"
                >
                  Contact Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};