import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap size={32} className="text-yellow-400" />,
    title: "Retention-Focused",
    description: "Every cut, zoom, and sound effect is placed psychologically to reset attention and keep viewers hooked."
  },
  {
    icon: <Clock size={32} className="text-accent-blue" />,
    title: "48h Turnaround",
    description: "Speed matters. Get your first draft within 48 hours so you can stay consistent with your upload schedule."
  },
  {
    icon: <TrendingUp size={32} className="text-green-400" />,
    title: "Data-Driven Edits",
    description: "I analyze your channel analytics to understand where viewers drop off and fix those gaps."
  },
  {
    icon: <Sparkles size={32} className="text-accent-pink" />,
    title: "Unique Style",
    description: "I develop a unique visual identity that matches your brand voice."
  }
];

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-[24px] p-8 md:p-10 relative group overflow-hidden transition-all duration-300 hover:-translate-y-2"
    >
      {/* Radial Gradient Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-6 inline-block p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-text-secondary leading-relaxed text-lg">{feature.description}</p>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-accent-purple"
          >
            Why Choose Us?
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-black mb-6"
          >
            Not Just Editors, <br/>
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Growth Partners
            </motion.span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};