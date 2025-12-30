import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoProject } from '../types';
import { VideoModal } from './ui/VideoModal';
import { VideoCard } from './ui/VideoCard';

const longFormData: VideoProject[] = [
  { id: '101', title: 'Infotainment long form', category: 'long', thumbnailUrl: '', videoUrl: 'https://www.youtube.com/watch?v=-GQ8Aq3Tj6Q', views: '15K' },
  { id: '102', title: 'Infotainment long form', category: 'long', thumbnailUrl: '', videoUrl: 'https://youtu.be/R6wJE-nTT2A?si=hDMSVBjMmS80mWD3&t=103', views: '12k' },
  { id: '103', title: 'Podast', category: 'long', thumbnailUrl: '', videoUrl: 'https://www.youtube.com/watch?v=nomcki-Mr5g', views: '64K' },
  { id: '104', title: 'Tech Headphones Review', category: 'long', thumbnailUrl: '', videoUrl: 'https://www.youtube.com/watch?v=8jxM1QTIL10', views: '100K' },
];

export const LongFormGallery: React.FC = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoStartTime, setSelectedVideoStartTime] = useState<number>(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const handleStop = () => setActiveVideoId(null);
    window.addEventListener('stop-inline-videos', handleStop);
    return () => window.removeEventListener('stop-inline-videos', handleStop);
  }, []);

  const handlePlayInline = (id: string) => {
    window.dispatchEvent(new Event('stop-inline-videos'));
    setTimeout(() => setActiveVideoId(id), 0);
  };

  const handleExpand = (url: string, startTime: number = 0) => {
    window.dispatchEvent(new Event('stop-inline-videos'));
    setSelectedVideoUrl(url);
    setSelectedVideoStartTime(startTime);
  };

  const handleCloseModal = () => {
    setSelectedVideoUrl(null);
    setSelectedVideoStartTime(0);
  };

  return (
    <section id="longform" className="py-24 bg-bg-secondary/30 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-4xl md:text-5xl font-bold mb-4 font-display"
            >
              Long Form{' '}
              <motion.span 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_auto]"
                animate={{ backgroundPosition: ["0% center", "200% center"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Masterpieces
              </motion.span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
              className="hidden md:block text-text-secondary max-w-xl"
            >
              Storytelling that keeps viewers watching until the very end. Perfect for YouTube videos, documentaries, and sales letters.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {longFormData.map((project) => (
            <VideoCard
              key={project.id}
              item={project}
              isActive={activeVideoId === project.id}
              onPlay={() => handlePlayInline(project.id)}
              onExpand={(startTime) => handleExpand(project.videoUrl, startTime)}
              aspectRatio="horizontal"
            />
          ))}
        </div>
      </div>

       <VideoModal 
        isOpen={!!selectedVideoUrl} 
        videoUrl={selectedVideoUrl}
        startTime={selectedVideoStartTime}
        onClose={handleCloseModal} 
      />
    </section>
  );
};