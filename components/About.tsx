import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="lg:w-1/2 relative group"
          >
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              {/* Inner Image Container */}
              <div className="relative z-10 overflow-hidden">
                 <img 
                  src='https://i.postimg.cc/jSpv1sCB/Universal-Upscaler-b727cac5-0646-4eb2-b9b6-5ce435b034b9.jpg'
                  alt="Editor Portrait" 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">Yajush Sharma</p>
                  <p className="text-brand-accent">Video Editor</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-secondary/20 rounded-full blur-3xl opacity-50" />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6">More Than Just A <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">Video Editor</span></h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              I started editing at 15, hacking together gaming montages. Today, I treat video editing as a science. 
              My philosophy combines <span className="text-white font-medium">cinematic storytelling</span> with <span className="text-white font-medium">analytical performance</span>.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              I don't just make things "look cool". I ask: "Will this frame make them stay?" If the answer is no, it gets cut.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['2+ Years Experience', 'Adobe Premiere Expert', 'After Effects Wizard', 'Photoshop Master'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-brand-accent" size={20} />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};