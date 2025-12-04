import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoProject } from '../types';
import { VideoModal } from './ui/VideoModal';
import { VideoCard } from './ui/VideoCard';

// Mock Data
const shortsData: VideoProject[] = [
  { id: '1', title: 'Viral Hook Strategy', category: 'short', thumbnailUrl: 'https://picsum.photos/300/533?random=1', videoUrl: 'https://youtube.com/shorts/r5yn3RunfMk?si=00RAxIiT4j6xDxpr', views: '1.2M' },
  { id: '2', title: 'Fast-Paced Lifestyle', category: 'short', thumbnailUrl: 'https://picsum.photos/300/533?random=2', videoUrl: 'https://www.youtube.com/shorts/pwbldA0U5hU', views: '850K' },
  { id: '3', title: 'Tech Review Snippet', category: 'short', thumbnailUrl: 'https://picsum.photos/300/533?random=3', videoUrl: 'https://www.youtube.com/shorts/pwbldA0U5hU', views: '2.4M' },
  { id: '4', title: 'Fitness Motivation', category: 'short', thumbnailUrl: 'https://picsum.photos/300/533?random=4', videoUrl: 'https://www.youtube.com/shorts/pwbldA0U5hU', views: '500K' },
  { id: '5', title: 'Gaming Highlight', category: 'short', thumbnailUrl: 'https://picsum.photos/300/533?random=5', videoUrl: 'https://www.youtube.com/shorts/pwbldA0U5hU', views: '3.1M' },
  { id: '6', title: 'Travel Montage', category: 'short', thumbnailUrl: 'https://picsum.photos/300/533?random=6', videoUrl: 'https://www.youtube.com/shorts/pwbldA0U5hU', views: '900K' },
];

export const ShortsGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Listen for event to stop this section's inline player if another video starts
  useEffect(() => {
    const handleStop = () => setActiveVideoId(null);
    window.addEventListener('stop-inline-videos', handleStop);
    return () => window.removeEventListener('stop-inline-videos', handleStop);
  }, []);

  const handlePlayInline = (id: string) => {
    // Stop any other running videos first
    window.dispatchEvent(new Event('stop-inline-videos'));
    setActiveVideoId(id);
  };

  const handleExpand = (url: string) => {
    window.dispatchEvent(new Event('stop-inline-videos'));
    setSelectedVideo(url);
  };

  return (
    <section id="shorts" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Short Form <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-primary">Dominance</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Engaging vertical content designed to stop the scroll and maximize retention on TikTok, Reels, and Shorts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortsData.map((project) => (
            <VideoCard 
              key={project.id}
              item={project}
              isActive={activeVideoId === project.id}
              onPlay={() => handlePlayInline(project.id)}
              onExpand={() => handleExpand(project.videoUrl)}
              aspectRatio="vertical"
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