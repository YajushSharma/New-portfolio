import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoProject } from '../types';
import { VideoModal } from './ui/VideoModal';
import { VideoCard } from './ui/VideoCard';

// Mock Data
const shortsData: VideoProject[] = [
  { id: '1', title: 'Viral Hook Strategy', category: 'short', thumbnailUrl: '', videoUrl: 'https://www.youtube.com/shorts/Vl6x5kGVCt8', views: '15k' },
  { id: '2', title: 'Social Media Ad', category: 'short', thumbnailUrl: '', videoUrl: 'https://youtube.com/shorts/mV7o-6bnklI?feature=share', views: '96K' },
  { id: '3', title: 'No Face Animation', category: 'short', thumbnailUrl: '', videoUrl: 'https://www.youtube.com/shorts/Nrm5v7WELLM', views: '106k' },
  { id: '4', title: 'Finance Content', category: 'short', thumbnailUrl: '', videoUrl: 'https://youtube.com/shorts/mlFYsiUVKiM?si=KSxZLp6Mva9e1lgK', views: '365K' },
  { id: '5', title: '3D Tracking Reel', category: 'short', thumbnailUrl: '', videoUrl: 'https://youtube.com/shorts/LmZh98uyLW0?si=UJPagK4ShYI41hbU', views: '300k' },
  { id: '6', title: 'Infotainment', category: 'short', thumbnailUrl: '', videoUrl: 'https://youtube.com/shorts/nyIxTKiPh9Q?si=aeSkQcKAzcf8LFII', views: '25k' },
];

export const ShortsGallery: React.FC = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const [selectedVideoStartTime, setSelectedVideoStartTime] = useState<number>(0);
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
    // Use timeout to ensure event is processed before setting state active
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
    <section id="shorts" className="py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-16 text-center">
           <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-5xl font-bold mb-4 font-display"
          >
            Short Form{' '}
            <motion.span 
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Dominance
            </motion.span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className="hidden md:block text-text-secondary max-w-2xl mx-auto"
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
              onExpand={(startTime) => handleExpand(project.videoUrl, startTime)}
              aspectRatio="vertical"
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