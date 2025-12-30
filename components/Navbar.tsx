import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'longform', label: 'Long Form' },
  { id: 'features', label: 'Why Us' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'about', label: 'About' },
];

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <motion.button 
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="relative w-10 h-10 flex items-center justify-center text-white focus:outline-none"
        >
            <motion.span
                variants={{
                    closed: { rotate: 0, y: -5 },
                    open: { rotate: 45, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
            />
            <motion.span
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.2 }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
            />
            <motion.span
                variants={{
                    closed: { rotate: 0, y: 5 },
                    open: { rotate: -45, y: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute w-6 h-0.5 bg-current rounded-full"
            />
        </motion.button>
    );
};

const menuContainerVariants: Variants = {
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: [0.23, 1, 0.32, 1],
            when: "afterChildren"
        }
    },
    open: {
        height: 'auto',
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.07,
            delayChildren: 0.1
        }
    }
};

const menuItemVariants: Variants = {
    closed: { opacity: 0, x: -15 },
    open: { opacity: 1, x: 0 }
};

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll Spy Logic
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                if (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    setActiveSection(section.id);
                }
                }
            }
            ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0, borderRadius: "50px" }}
        animate={{ 
            y: 0, 
            opacity: 1, 
            borderRadius: mobileMenuOpen ? "24px" : "50px",
            backgroundColor: "rgba(18, 18, 26, 0.05)", // Always transparent glass", 
            borderColor: "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 mx-auto w-[90%] md:w-[85%] max-w-5xl border backdrop-blur-xl shadow-glass overflow-hidden"
      >
        <div className="px-6 md:px-8 flex items-center justify-between relative z-10 h-16 md:h-20 transition-all duration-300">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer select-none group" 
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-all duration-300">
               <span className="font-display font-bold text-lg text-white">R</span>
            </div>
            <span className="font-display text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              RazexEdits
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-2 py-2 text-sm font-medium transition-colors
                  ${activeSection === item.id ? 'text-white' : 'text-text-secondary hover:text-white'}
                `}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-primary rounded-full shadow-glow-purple"
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative overflow-hidden rounded-full font-bold text-sm hover:translate-y-[-2px] hover:shadow-glow-purple transition-all duration-300 px-6 py-2.5"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-primary" />
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-500 group-hover:left-[100%]" />
              <span className="relative z-10 text-white">Contact Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
             <AnimatedMenuIcon isOpen={mobileMenuOpen} />
          </div>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden border-t border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    variants={menuItemVariants}
                    onClick={() => scrollToSection(item.id)}
                    className={`py-3 px-4 rounded-xl text-left font-medium text-lg transition-colors ${activeSection === item.id ? 'text-accent-purple bg-white/5' : 'text-text-secondary hover:text-white'}`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button 
                  variants={menuItemVariants}
                  onClick={() => scrollToSection('contact')}
                  className="mt-4 bg-gradient-primary text-white py-3 rounded-xl font-bold shadow-glow-purple"
                >
                  Contact Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};