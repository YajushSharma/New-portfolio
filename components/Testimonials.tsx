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
    quote: "Working with him honestly made my workflow so much smoother. As a designer I’m picky about pacing and clarity, but he somehow understood exactly what I wanted without me over-explaining. Every edit felt intentional. My videos finally look the way I imagine them while scripting.",
    rating: 5
  },
  {
    id: '2',
    name: 'Electrical Unboxing',
    role: 'Tech Creator',
    avatarUrl: 'https://yt3.googleusercontent.com/wApBhsexFgQZVMG24WaOjnDWZB2d0b-j95hKZLj3hMoj2mwPOaK8Vn3wA2Y_1IzMp5OJQZd2-A=s160-c-k-c0x00ffffff-no-rj',
    quote: "I’ve tried a lot of editors, but he brought a kind of clean, sharp style that fits tech videos perfectly. The short edits especially — crisp cuts, great timing, and no unnecessary flash. My unboxing clips suddenly felt way more premium. Really happy with the consistency too.",
    rating: 5
  },
  {
    id: '3',
    name: 'Varuna Saini',
    role: 'Social Media Manager',
    avatarUrl: 'https://ibb.co/FbHJ0Rqk',
    quote: "What I loved most was how reliable he was. I handle multiple clients, and he never once missed a deadline or left me stressed. He adapted to different brand styles quickly and delivered edits that made my clients genuinely excited to post. A super smooth collaboration overall.",
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
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
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