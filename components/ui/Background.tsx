import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export const Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile Scroll Velocity Logic
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityOpacity = useTransform(smoothVelocity, [0, 1000], [0.15, 0.5]);

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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-50, 50, -50],
          y: [-20, 20, -20]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/20 rounded-full blur-[120px]" 
      />
      <motion.div 
         animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [50, -50, 50],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-secondary/20 rounded-full blur-[120px]" 
      />

      {/* Desktop Mouse Reactive Grid */}
      {!isMobile && (
        <div 
          ref={containerRef}
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 40%)',
            WebkitMaskImage: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 40%)',
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
      
      {/* Base Grid (Dimmer) */}
      <div 
        className="absolute inset-0 z-[-1] opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  );
};