import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoProject } from '../types';
import { VideoModal } from './ui/VideoModal';
import { VideoCard } from './ui/VideoCard';

const longFormData: VideoProject[] = [
  { id: '101', title: 'Full Documentary Edit', category: 'long', thumbnailUrl: 'https://picsum.photos/600/338?random=10', videoUrl: 'https://www.youtube.com/watch?v=fMrR-NqyGSk', views: '450K' },
  { id: '102', title: 'Educational Course Module', category: 'long', thumbnailUrl: 'https://picsum.photos/600/338?random=11', videoUrl: 'https://www.youtube.com/watch?v=CDvo7jpAiCM', views: '120K' },
  { id: '103', title: 'Corporate Brand Story', category: 'long', thumbnailUrl: 'https://picsum.photos/600/338?random=12', videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', views: '80K' },
  { id: '104', title: 'Product Launch VSL', category: 'long', thumbnailUrl: 'https://picsum.photos/600/338?random=13', videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', views: '200K' },
];

export const LongFormGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    const handleStop = () => setActiveVideoId(null);
    window.addEventListener('stop-inline-videos', handleStop);
    return () => window.removeEventListener('stop-inline-videos', handleStop);
  }, []);

  const handlePlayInline = (id: string) => {
    window.dispatchEvent(new Event('stop-inline-videos'));
    setActiveVideoId(id);
  };

  const handleExpand = (url: string) => {
    window.dispatchEvent(new Event('stop-inline-videos'));
    setSelectedVideo(url);
  };

  return (
    <section id="longform" className="py-24 bg-brand-surface/30 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Long Form <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">Masterpieces</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 max-w-xl"
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
              onExpand={() => handleExpand(project.videoUrl)}
              aspectRatio="horizontal"
            />
          ))}
        </div>
      </div>

       <VideoModal 
        isOpen={!!selectedVideo} 
        videoUrl={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </section>
  );
};