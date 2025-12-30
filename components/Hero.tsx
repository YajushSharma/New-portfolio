import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const words = ["Views", "Engagement", "Sales", "Growth"];

export const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    const word = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(
          word.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center z-10">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-purple"></span>
          </span>
          <span className="text-sm font-semibold text-white tracking-wide">Accepting New Clients</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white leading-[1.1]"
        >
          Editing that drives <br className="hidden md:block" />
          <span className="bg-gradient-primary bg-clip-text text-transparent pb-2">
            {currentText}
            {/* Blinking Cursor Fix: Ensure text-fill-color is reset for the pipe */}
            <span className="animate-pulse text-white inline-block ml-1 align-middle" style={{ WebkitTextFillColor: 'white' }}>|</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:block text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          I help content creators and brands scale their presence with high-retention, psychology-backed video editing.
        </motion.p>

        {/* CTA Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 w-full max-w-md md:max-w-none mx-auto"
        >
          {/* Primary Button with Shine Effect */}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative w-full md:w-auto h-14 px-8 rounded-full font-bold text-lg text-white overflow-hidden shadow-glow-purple transition-transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-primary" />
            {/* Shine */}
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover:left-[100%]" />
            
            <span className="relative z-10 flex items-center justify-center gap-2">
               Start Your Project
            </span>
          </button>
          
          {/* Secondary Glass Button */}
          <button 
            onClick={() => document.getElementById('longform')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full md:w-auto h-14 px-8 rounded-full font-bold text-lg text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
          >
             View Portfolio
          </button>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8 border-t border-white/5"
        >
          <p className="text-xs text-text-tertiary mb-6 uppercase tracking-[0.2em] font-bold">Trusted By Creators On</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Youtube size={28} /> <span className="font-display text-lg font-bold">YouTube</span>
            </div>
            <div className="flex items-center gap-2 hover:text-pink-500 transition-colors">
              <Instagram size={28} /> <span className="font-display text-lg font-bold">Instagram</span>
            </div>
             <div className="flex items-center gap-2 hover:text-white transition-colors">
              <XLogo className="w-6 h-6" /> <span className="font-display text-lg font-bold">Twitter/X</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};