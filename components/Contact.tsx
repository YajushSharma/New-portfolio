import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Youtube } from 'lucide-react';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="relative pt-20 pb-10">
      
      {/* CTA Card Section */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="glass-card rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden group"
        >
          {/* Radial Gradient Hover Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none" />

          {/* Animated Glow Background */}
          <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(168,85,247,0.25),transparent_60%)] blur-[80px] pointer-events-none animate-pulse" />
          
          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Ready to go{' '}
              <motion.span 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple bg-[length:200%_auto]"
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Viral?
              </motion.span>
            </h2>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto font-light">
              Spots are limited. Let's discuss your content strategy and see if we're a good fit.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="http://wa.me/7248197932" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-bg-primary rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all w-full sm:w-auto justify-center"
               >
                <MessageCircle size={20} className="group-hover:animate-bounce" />
                Message on Whatsapp
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:yajush72@gmail.com"
                className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all w-full sm:w-auto justify-center"
              >
                <Mail size={20} />
                Send an Email
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-sm font-bold text-white shadow-glow-purple">R</div>
           <span className="font-display font-bold text-lg text-text-secondary">RazexEdits</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-text-tertiary hover:text-white transition-colors"><XLogo className="w-5 h-5" /></a>
          <a href="#" className="text-text-tertiary hover:text-accent-pink transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-text-tertiary hover:text-red-500 transition-colors"><Youtube size={20} /></a>
        </div>

        <p className="text-sm text-text-tertiary">
          © {new Date().getFullYear()} RazexEdits. All rights reserved.
        </p>
      </div>
    </footer>
  );
};