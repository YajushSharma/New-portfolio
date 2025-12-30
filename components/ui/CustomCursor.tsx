import React, { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'video'>('default');
  const [hasMoved, setHasMoved] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the trailing effect
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const quickSpringConfig = { damping: 20, stiffness: 400, mass: 0.1 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // A second set of values for the "inner dot" that is more responsive
  const dotX = useSpring(mouseX, quickSpringConfig);
  const dotY = useSpring(mouseY, quickSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!hasMoved) setHasMoved(true);
  }, [mouseX, mouseY, hasMoved]);

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia('(pointer: fine)').matches) {
        setIsVisible(true);
      }
    };
    checkDevice();

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [role="button"], .cursor-pointer');
      const isVideo = target.closest('[data-cursor="video"]');

      if (isVideo) {
        setCursorType('video');
        setIsHovering(true);
      } else if (interactive) {
        setCursorType('pointer');
        setIsHovering(true);
      } else {
        setCursorType('default');
        setIsHovering(false);
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

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Trailing Ring */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ 
          x: cursorX, 
          y: cursorY,
          opacity: hasMoved ? 1 : 0
        }}
      >
        <motion.div
          animate={{
            width: cursorType === 'video' ? 100 : (isHovering ? 60 : 32),
            height: cursorType === 'video' ? 100 : (isHovering ? 60 : 32),
            backgroundColor: cursorType === 'video' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isClicking ? '#6366f1' : (isHovering ? '#06b6d4' : 'rgba(255, 255, 255, 0.3)'),
            borderWidth: isHovering ? '1px' : '1.5px',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="rounded-full border -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[2px]"
        >
          <AnimatePresence>
            {cursorType === 'video' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-[10px] font-black uppercase tracking-widest text-brand-accent"
              >
                Play
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Main Responsive Dot */}
      <motion.div
        className="absolute top-0 left-0 mix-blend-difference"
        style={{ 
          x: dotX, 
          y: dotY,
          opacity: hasMoved ? 1 : 0 
        }}
      >
        <motion.div 
          animate={{
            scale: isHovering ? 0.5 : 1,
            backgroundColor: isClicking ? '#06b6d4' : '#ffffff'
          }}
          className="w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" 
        />
      </motion.div>
    </div>
  );
};