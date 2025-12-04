import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Instagram, Github } from 'lucide-react';

// Custom X Logo
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden bg-black">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Ready to go <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">Viral?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Spots are limited. Let's discuss your content strategy and see if we're a good fit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
             <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="http://wa.me/7248197932" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-green-500 hover:text-white transition-all w-full sm:w-auto justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
             >
              <MessageCircle size={20} className="group-hover:animate-bounce" />
              Message on Whatsapp
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:yajush72@gmail.com"
              className="flex items-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all w-full sm:w-auto justify-center"
            >
              <Mail size={20} />
              Send an Email
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded bg-brand-primary flex items-center justify-center text-xs font-bold text-white">E</div>
           <span className="font-bold text-gray-300">EditorGenius</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><XLogo className="w-5 h-5" /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
        </div>

        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} EditorGenius. All rights reserved.
        </p>
      </div>
    </footer>
  );
};