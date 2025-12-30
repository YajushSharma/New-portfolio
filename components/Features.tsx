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
    icon: <Clock size={32} className="text-brand-accent" />,
    title: "48h Turnaround",
    description: "Speed matters. Get your first draft within 48 hours so you can stay consistent with your upload schedule."
  },
  {
    icon: <TrendingUp size={32} className="text-green-400" />,
    title: "Data-Driven Edits",
    description: "I analyze your channel analytics to understand where viewers drop off and fix those gaps."
  },
  {
    icon: <Sparkles size={32} className="text-brand-secondary" />,
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 group overflow-hidden"
    >
      <div className="relative z-20">
        <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
          {feature.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-gray-400 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Why Top Creators <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">Choose Us</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="hidden md:block text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We don't just edit videos. We engineer content for growth using proven retention strategies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};