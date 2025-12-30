import React, { useEffect, useRef } from 'react';

export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dots: any[] = [];
    
    // Config
    const DOT_SPACING = 40; // Slightly tighter for better effect
    const DOT_SIZE = 1.5;
    const MOUSE_RADIUS = 150; // Increased radius for visibility
    
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;
    let resizeTimeout: any;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    const initDots = () => {
      dots = [];
      for (let x = 0; x < width; x += DOT_SPACING) {
        for (let y = 0; y < height; y += DOT_SPACING) {
          dots.push({
            x: x,
            y: y,
            baseAlpha: 0.1,
            alpha: 0.1,
            targetAlpha: 0.1
          });
        }
      }
    };

    const updateDots = () => {
      dots.forEach(dot => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 1. Calculate the new target alpha based on distance
        let newTargetAlpha;
        if (distance < MOUSE_RADIUS) {
            // Brightest at center (0.8), fading out
            newTargetAlpha = 0.8 - (distance / MOUSE_RADIUS) * 0.7;
        } else {
            newTargetAlpha = dot.baseAlpha;
        }

        // 2. 👇 CRITICAL FIX: Update the dot's target property
        dot.targetAlpha = newTargetAlpha;

        // 3. Smoothly interpolate current alpha towards target alpha
        // "0.1" is the speed factor (0.05 = slow, 0.2 = fast)
        if (Math.abs(dot.targetAlpha - dot.alpha) > 0.001) {
            dot.alpha += (dot.targetAlpha - dot.alpha) * 0.1;
        }
      });
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, width, height);
      
      dots.forEach(dot => {
        // Only draw if visible enough to matter
        if (dot.alpha > 0.05) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, DOT_SIZE, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
            ctx.fill();
        }
      });
    };

    const animate = () => {
      updateDots();
      drawDots();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    animate();

    // Event Listeners
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

 return (
    <div className="fixed inset-0 z-0 bg-bg-primary overflow-hidden pointer-events-none">
       {/* 1. Interactive Starfield Canvas - containing optimized loop */}
       <canvas 
        ref={canvasRef} 
        id="shimmer-canvas"
        className="absolute top-0 left-0 w-full h-full z-10 opacity-70"
       />

       {/* Floating orbs with will-change-transform for GPU layering */}
       
       {/* 2. Primary Vibrant Orb (Top Right) */}
       <div className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-accent-purple/50 via-accent-pink/50 to-transparent blur-[100px] animate-float opacity-80 mix-blend-screen will-change-transform" />
       
       {/* 3. Secondary Deep Orb (Bottom Left) */}
       <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-accent-blue/40 blur-[120px] animate-float opacity-80 mix-blend-screen will-change-transform" style={{ animationDelay: '3s', animationDuration: '8s' }} />

       {/* 4. Warmth Accent (Center-Left) */}
       <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-accent-orange/20 blur-[90px] animate-float opacity-80 mix-blend-screen will-change-transform" style={{ animationDelay: '5s', animationDuration: '10s' }} />

       {/* 5. Center Glow */}
       <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-accent-purple/20 blur-[100px] pointer-events-none" />

       {/* 6. Vignette */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/10 to-bg-primary/80 z-0" />
    </div>
  );
};