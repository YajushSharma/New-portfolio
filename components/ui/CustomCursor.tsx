import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'pointer' | 'text' | 'video'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics Config - Kept the "Elegant" smooth feeling
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const quickSpringConfig = { damping: 20, stiffness: 1000, mass: 0.1 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const dotX = useSpring(mouseX, quickSpringConfig);
  const dotY = useSpring(mouseY, quickSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!hasMoved) setHasMoved(true);
  }, [mouseX, mouseY, hasMoved]);

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsVisible(true);
    }

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isVideo = target.closest('[data-cursor="video"]');
      const isLink = target.closest('button, a, [role="button"], .cursor-pointer');
      const isInput = target.closest('input, textarea');

      if (isVideo) {
        setCursorVariant('video');
      } else if (isLink) {
        setCursorVariant('pointer');
      } else if (isInput) {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => setHasMoved(false);
    const handleMouseEnter = () => setHasMoved(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove]);

  if (!isVisible) return null;

  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderWidth: '1px',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
    },
    pointer: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderWidth: '1px',
      borderColor: 'rgba(168, 85, 247, 0.5)',
      borderRadius: '50%',
    },
    text: {
      width: 4,
      height: 32,
      backgroundColor: 'rgba(168, 85, 247, 1)',
      borderWidth: '0px',
      borderColor: 'rgba(168, 85, 247, 0)',
      borderRadius: '4px',
    },
    // 👇 RESTORED: Your original "Play" text styling
    video: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(168, 85, 247, 0.1)', // Transparent purple tint
      borderWidth: '0px',
      borderColor: 'transparent',
      borderRadius: '50%',
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      
      {/* OUTER RING */}
      <motion.div
        className="absolute top-0 left-0 will-change-transform"
        style={{ 
          x: cursorX, 
          y: cursorY,
          opacity: hasMoved ? 1 : 0
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
            
            <motion.div
              variants={ringVariants}
              animate={cursorVariant}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="flex items-center justify-center backdrop-blur-[2px] shadow-lg overflow-hidden"
              style={{ scale: isClicking ? 0.8 : 1 }}
            >
              <AnimatePresence mode="wait">
                {/* 👇 RESTORED: The "Play" text animation */}
                {cursorVariant === 'video' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-[12px] font-display font-bold uppercase tracking-widest text-white drop-shadow-md"
                  >
                    Play
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

        </div>
      </motion.div>

      {/* INNER DOT */}
      <motion.div
        className="absolute top-0 left-0 will-change-transform"
        style={{ 
          x: dotX, 
          y: dotY,
          opacity: hasMoved && cursorVariant !== 'video' && cursorVariant !== 'text' ? 1 : 0 
        }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
            <motion.div 
              animate={{
                scale: cursorVariant === 'pointer' ? 0 : 1,
                backgroundColor: isClicking ? '#ec4899' : '#a855f7'
              }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 bg-accent-purple rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" 
            />
        </div>
      </motion.div>
    </div>
  );
};