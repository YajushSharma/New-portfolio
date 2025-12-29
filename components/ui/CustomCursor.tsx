import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Mouse position values - initialize off-screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Tuned physics: Slightly higher stiffness for better responsiveness while keeping it smooth
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      // Only show on non-touch devices
      if (window.matchMedia('(pointer: fine)').matches) {
        setIsVisible(true);
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e: MouseEvent) => {
      if (!hasMoved) {
        setHasMoved(true);
        // Instant set on first move
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractiveTag = ['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'LABEL'].includes(target.tagName);
      const isInteractiveElement = 
        isInteractiveTag || 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer');
      
      if (isInteractiveElement) {
        setIsHovering(true);
      } else {
        const cursorStyle = window.getComputedStyle(target).cursor;
        setIsHovering(cursorStyle === 'pointer');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
       setIsHovering(false);
       // Handle leaving the window via mouseout (fallback)
       if (!e.relatedTarget) {
         setHasMoved(false); 
       }
    }
    
    // Also add listener for document mouseleave to reliably catch leaving the window
    const handleDocMouseLeave = () => {
       setHasMoved(false);
    };
    const handleDocMouseEnter = () => {
       // We let the next mousemove set it to visible
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleDocMouseLeave);
    document.addEventListener('mouseenter', handleDocMouseEnter);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleDocMouseLeave);
      document.removeEventListener('mouseenter', handleDocMouseEnter);
    };
  }, [mouseX, mouseY, hasMoved]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ 
            x: cursorX, 
            y: cursorY,
            opacity: hasMoved ? 1 : 0 
        }}
      >
        <motion.div 
          animate={{
            scale: isHovering ? 0 : 1, 
            opacity: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.15 }}
          className="w-2.5 h-2.5 bg-brand-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(6,182,212,0.8)]" 
        />
      </motion.div>

      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ 
            x: cursorX, 
            y: cursorY,
            opacity: hasMoved ? 1 : 0
        }}
      >
        <motion.div
          initial={{ width: 24, height: 24 }}
          animate={{
            width: isHovering ? 48 : 24, 
            height: isHovering ? 48 : 24,
            backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.05)' : 'transparent',
            borderColor: isClicking ? '#a855f7' : (isHovering ? 'rgba(6, 182, 212, 0.5)' : '#06b6d4'),
            scale: isClicking ? 0.8 : 1,
            borderWidth: isHovering ? '1px' : '2px',
          }}
          transition={{ duration: 0.2, ease: "easeOut" }} 
          className="rounded-full border border-brand-accent -translate-x-1/2 -translate-y-1/2 backdrop-blur-[1px] shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        />
      </motion.div>
    </>
  );
};