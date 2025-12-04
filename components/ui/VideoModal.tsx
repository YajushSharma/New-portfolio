import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string | null;
  onClose: () => void;
  startTime?: number; // Added startTime prop
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getInstagramId = (url: string) => {
  const regExp = /(?:instagram\.com\/(?:p|reel|tv)\/)([^/?#&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, videoUrl, onClose, startTime = 0 }) => {
  let platform = 'unknown';
  let videoId = null;

  if (videoUrl) {
    const ytId = getYoutubeId(videoUrl);
    const igId = getInstagramId(videoUrl);
    
    if (ytId) {
      platform = 'youtube';
      videoId = ytId;
    } else if (igId) {
      platform = 'instagram';
      videoId = igId;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full ${platform === 'instagram' ? 'max-w-md aspect-[9/16]' : 'max-w-5xl aspect-video'} bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            
            {platform === 'youtube' && videoId && (
              <iframe
                width="100%"
                height="100%"
                // Append startTime to resume playback
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&start=${Math.floor(startTime)}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            )}

            {platform === 'instagram' && videoId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.instagram.com/p/${videoId}/embed/`}
                title="Instagram video player"
                allow="encrypted-media"
                allowFullScreen
                className="w-full h-full"
                scrolling="no"
              ></iframe>
            )}

            {!videoId && (
              <div className="flex items-center justify-center h-full text-white">
                <p>Invalid Video URL</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};