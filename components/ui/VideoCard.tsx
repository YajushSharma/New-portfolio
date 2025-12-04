import React from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';
import { VideoProject } from '../../types';

interface VideoCardProps {
  item: VideoProject;
  isActive: boolean;
  onPlay: () => void;
  onExpand: () => void;
  aspectRatio: 'vertical' | 'horizontal';
}

export const VideoCard: React.FC<VideoCardProps> = ({ item, isActive, onPlay, onExpand, aspectRatio }) => {
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const videoId = getYoutubeId(item.videoUrl);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={!isActive ? { scale: 1.02, zIndex: 10 } : {}}
      className={`relative rounded-xl overflow-hidden cursor-pointer border border-white/5 shadow-lg bg-gray-900 group ${
        aspectRatio === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {isActive && videoId ? (
        <div className="relative w-full h-full bg-black z-20">
           <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-brand-primary transition-colors backdrop-blur-md z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              title="Maximize"
            >
              <Maximize2 size={16} />
            </button>
        </div>
      ) : (
        <div onClick={onPlay} className="w-full h-full relative z-10">
           {/* Thumbnail */}
           <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 bg-brand-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.5)] transform group-hover:scale-110 transition-transform">
              <Play size={24} className="ml-1 text-white fill-white" />
            </div>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 pointer-events-none">
            <h3 className="text-sm font-bold text-white mb-1 leading-tight line-clamp-2 drop-shadow-md">{item.title}</h3>
            {item.views && (
               <div className="flex items-center gap-2 text-xs text-brand-accent font-medium">
                <span>{item.views} Views</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};