import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Saurabh Saini',
    role: 'YouTuber (500k Subs)',
    avatarUrl: 'https://yt3.googleusercontent.com/5jby35vaE8MN-wPvZmtT3VdWAHQG673XqlMzT4omFNFBrBVD6A43jMfgRUKF63ulCyCRSPsG=s160-c-k-c0x00ffffff-no-rj',
    quote: "Working with him honestly made my workflow so much smoother. As a designer I’m picky about pacing and clarity, but he somehow understood exactly what I wanted without me over-explaining. Every edit felt intentional.",
    rating: 5
  },
  {
    id: '2',
    name: 'Electrical Unboxing',
    role: 'Tech Creator',
    avatarUrl: 'https://yt3.googleusercontent.com/wApBhsexFgQZVMG24WaOjnDWZB2d0b-j95hKZLj3hMoj2mwPOaK8Vn3wA2Y_1IzMp5OJQZd2-A=s160-c-k-c0x00ffffff-no-rj',
    quote: "I’ve tried a lot of editors, but he brought a kind of clean, sharp style that fits tech videos perfectly. The short edits especially — crisp cuts, great timing, and no unnecessary flash. My unboxing clips suddenly felt way more premium.",
    rating: 5
  },
  {
    id: '3',
    name: 'Varuna Saini',
    role: 'Social Media Manager',
    avatarUrl: 'https://i.postimg.cc/9FmgfjmM/541945722-17913415653191413-2130760182026480468-n.jpg',
    quote: "What I loved most was how reliable he was. I handle multiple clients, and he never once missed a deadline or left me stressed. He adapted to different brand styles quickly and delivered edits that made my clients genuinely excited to post.",
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      // 👇 ADD THIS: Native Framer Motion hover
      whileHover={{ 
        y: -10, 
        transition: { duration: 0.3, delay: 0 } // distinct transition for hover (no delay!)
      }}
      viewport={{ once: true, margin: "-50px" }}
      // Keep the main transition for the entry animation
      transition={{ duration: 0.6, delay: i * 0.1 }} 
      
      // 👇 REMOVED: hover:-translate-y-2 transition-transform duration-300
      className="glass-card rounded-[24px] p-10 flex flex-col gap-6 relative group overflow-hidden"
    >
      {/* Radial Gradient Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none" />

      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-accent-pink/10 transition-colors" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col gap-6 h-full">
          <div className="flex gap-1">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
              ))}
          </div>
          
          <p className="text-text-secondary text-lg leading-relaxed italic flex-grow">"{t.quote}"</p>
          
          <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-primary">
                <img src={t.avatarUrl} alt={t.name} className="w-full h-full rounded-full object-cover border-2 border-bg-secondary" />
            </div>
            <div>
              <h4 className="font-bold text-white font-display">{t.name}</h4>
              <p className="text-sm text-text-tertiary">{t.role}</p>
            </div>
          </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
         >
          <span className="text-accent-pink font-bold tracking-widest uppercase text-sm mb-2 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-black">
            Creator{' '}
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Stories
            </motion.span>
          </h2>
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