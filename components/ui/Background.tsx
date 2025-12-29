import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile Scroll Velocity Logic
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityOpacity = useTransform(smoothVelocity, [0, 1000], [0.02, 0.12]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || !containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-brand-dark">
      {/* Animated Gradients / Orbs */}
      {/* Orb 1: Primary Indigo - Slow drift */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '10%', '-10%']
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-brand-primary/20 rounded-full blur-[100px] md:blur-[120px]" 
      />
      
      {/* Orb 2: Secondary Purple - Counter drift */}
      <motion.div 
         animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-10%', '10%']
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-brand-secondary/20 rounded-full blur-[100px] md:blur-[120px]" 
      />
      
      {/* Orb 3: Accent Cyan - Center float */}
       <motion.div 
         animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: ['-5%', '5%', '-5%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] bg-brand-accent/15 rounded-full blur-[100px] md:blur-[120px]" 
      />

      {/* Orb 4: Rose/Pink - Top Right Accent */}
      <motion.div 
        animate={{ 
          scale: [0.8, 1, 0.8],
          opacity: [0.1, 0.25, 0.1],
          y: ['5%', '-5%', '5%'],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-rose-500/10 rounded-full blur-[80px] md:blur-[100px]" 
      />

       {/* Orb 5: Deep Blue - Bottom Left Anchor */}
       <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: ['5%', '-5%', '5%'],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[10%] left-[10%] w-[45vw] h-[45vw] bg-blue-600/10 rounded-full blur-[80px] md:blur-[100px]" 
      />

      {/* Desktop Mouse Reactive Grid */}
      {!isMobile && (
        <div 
          ref={containerRef}
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            // Smaller circle (150px radius) for sharper flashlight effect
            maskImage: 'radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 75%)',
          } as React.CSSProperties}
        />
      )}

      {/* Mobile Velocity Reactive Grid */}
      {isMobile && (
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: velocityOpacity
          }}
        />
      )}
      
      {/* Base Grid (Very Dim) */}
      <div 
        className="absolute inset-0 z-[-1] opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 2px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
};