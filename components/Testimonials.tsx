import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Hormozi Style Channel',
    role: 'YouTuber (500k Subs)',
    avatarUrl: 'https://picsum.photos/100/100?random=20',
    quote: "The retention on my videos went up by 35% after switching to EditorGenius. The visual hooks are insane.",
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    role: 'Course Creator',
    avatarUrl: 'https://picsum.photos/100/100?random=21',
    quote: "I was drowning in editing work. Now I just film and upload. Best investment for my business this year.",
    rating: 5
  },
  {
    id: '3',
    name: 'TechDaily',
    role: 'Tech Reviewer',
    avatarUrl: 'https://picsum.photos/100/100?random=22',
    quote: "Clean, professional, and fast. They understood my brand guidelines perfectly from day one.",
    rating: 5
  }
];

interface TestimonialCardProps {
  t: Testimonial;
  i: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ t, i }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.2 }}
      className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group overflow-hidden"
    >
      <div className="relative z-20">
        {/* Quote Icon Background */}
        <div className="absolute top-4 right-6 text-6xl text-white/5 font-serif">"</div>
        
        <div className="flex gap-1 mb-6">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        <p className="text-gray-300 mb-8 italic relative z-10">"{t.quote}"</p>
        
        <div className="flex items-center gap-4">
          <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full border border-white/20" />
          <div>
            <h4 className="font-bold text-white">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-gradient-to-b from-transparent to-brand-surface/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
         >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Hear From My <span className="text-green-400">Clients</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};