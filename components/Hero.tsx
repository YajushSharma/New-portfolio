import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';

// Custom X Logo Component
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center z-10">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-300">Accepting New Clients for Oct 2023</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          Editing that drives <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary min-w-[200px] inline-block text-left">
            {currentText}
            <span className="animate-pulse text-white">|</span>
          </span>
        </motion.h1>

        {/* Subheadline (Hidden on mobile) */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden md:block text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I help content creators and brands scale their presence with high-retention, psychology-backed video editing.
        </motion.p>

        {/* CTA Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md md:max-w-none mx-auto"
        >
          {/* Start Your Project / Contact Now Button */}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative w-full md:w-auto h-16 md:h-14 px-8 rounded-full font-bold text-lg text-white overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-accent to-brand-primary opacity-100" />
            
            {/* Sliding Text Content */}
            <div className="relative z-10 w-full h-full overflow-hidden">
               <div className="flex flex-col h-[200%] transition-transform duration-500 ease-in-out group-hover:-translate-y-1/2">
                  <span className="h-1/2 flex items-center justify-center gap-2">
                    Start Your Project
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                  <span className="h-1/2 flex items-center justify-center gap-2 text-white">
                    Contact Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
               </div>
            </div>
          </button>
          
          <button 
            onClick={() => document.getElementById('longform')?.scrollIntoView({ behavior: 'smooth' })}
            className="group w-full md:w-auto h-16 md:h-14 px-8 rounded-full font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition-all relative overflow-hidden"
          >
             <span className="relative z-10 flex items-center justify-center h-full">View Portfolio</span>
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
          </button>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pt-8 border-t border-white/5"
        >
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest font-semibold">Videos optimized for</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-default">
              <Youtube size={32} /> <span className="text-xl font-bold">YouTube</span>
            </div>
            <div className="flex items-center gap-2 hover:text-pink-500 transition-colors cursor-default">
              <Instagram size={32} /> <span className="text-xl font-bold">Instagram</span>
            </div>
             <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <XLogo className="w-7 h-7" /> <span className="text-xl font-bold">Twitter/X</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};