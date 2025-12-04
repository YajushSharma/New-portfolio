import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2, Instagram } from 'lucide-react';
import { VideoProject } from '../../types';

interface VideoCardProps {
  item: VideoProject;
  isActive: boolean;
  onPlay: () => void;
  onExpand: (startTime?: number) => void;
  aspectRatio: 'vertical' | 'horizontal';
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoCard: React.FC<VideoCardProps> = ({ item, isActive, onPlay, onExpand, aspectRatio }) => {
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

  const youtubeId = getYoutubeId(item.videoUrl);
  const instagramId = getInstagramId(item.videoUrl);
  const platform = youtubeId ? 'youtube' : (instagramId ? 'instagram' : 'unknown');

  const [thumbnail, setThumbnail] = useState<string>(item.thumbnailUrl);
  const [imgError, setImgError] = useState(false);
  
  // State to keep the player mounted after first play
  const [isRevealed, setIsRevealed] = useState(false);
  
  // Ref for YouTube Player instance
  const playerRef = useRef<any>(null);
  const iframeId = `yt-player-${item.id}`;

  useEffect(() => {
    // Reset error state when item changes
    setImgError(false);

    // 1. If user provided a specific valid URL (not # or empty), use it.
    if (item.thumbnailUrl && item.thumbnailUrl !== '#' && item.thumbnailUrl.trim() !== '') {
      setThumbnail(item.thumbnailUrl);
      return;
    }

    // 2. If no valid thumbnail provided, try to automate based on platform
    if (platform === 'youtube' && youtubeId) {
      setThumbnail(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);
    } else {
      // For Instagram or unknown, we don't set a URL here, we'll handle the fallback UI in render
      setThumbnail(''); 
    }
  }, [item.thumbnailUrl, youtubeId, platform]);

  const handleImageError = () => {
    if (platform === 'youtube' && youtubeId && !thumbnail.includes('hqdefault')) {
      // Fallback for YouTube
      setThumbnail(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    } else {
      setImgError(true);
    }
  };

  // Initialize YouTube Player when revealed
  useEffect(() => {
    if (isRevealed && platform === 'youtube' && youtubeId) {
      const initPlayer = () => {
        if (window.YT && window.YT.Player) {
           playerRef.current = new window.YT.Player(iframeId, {
            events: {
              'onReady': (event: any) => {
                // If it was supposed to be active when it got ready, play it
                if (isActive) {
                   event.target.playVideo();
                }
              }
            }
          });
        }
      };

      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        // Retry logic or wait for API (simple timeout approach for now)
        const checkYT = setInterval(() => {
           if (window.YT && window.YT.Player) {
             clearInterval(checkYT);
             initPlayer();
           }
        }, 100);
        return () => clearInterval(checkYT);
      }
    }
    
    // Cleanup
    return () => {
       if (playerRef.current && playerRef.current.destroy) {
         try {
            playerRef.current.destroy();
         } catch(e) {}
         playerRef.current = null;
       }
    };
  }, [isRevealed, platform, youtubeId, iframeId]); // Depend on youtubeId to recreate if item changes

  // Control Play/Pause based on isActive prop
  useEffect(() => {
    if (platform === 'youtube' && playerRef.current && playerRef.current.playVideo) {
      try {
        const playerState = playerRef.current.getPlayerState();
        if (isActive) {
           // Only play if not already playing or buffering
           if (playerState !== 1 && playerState !== 3) {
              playerRef.current.playVideo();
           }
        } else {
           // Pause if it's playing
           if (playerState === 1 || playerState === 3) {
             playerRef.current.pauseVideo();
           }
        }
      } catch (e) {
        console.error("Player control error", e);
      }
    }
  }, [isActive, platform]);

  const handlePlayClick = () => {
    setIsRevealed(true);
    onPlay();
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    let startTime = 0;
    
    // Try to get current time from YT player
    if (platform === 'youtube' && playerRef.current && playerRef.current.getCurrentTime) {
      try {
        startTime = playerRef.current.getCurrentTime();
      } catch (err) {
        console.log("Could not get current time", err);
      }
    }
    
    onExpand(startTime);
  };

  const showCustomPlaceholder = (thumbnail === '' || thumbnail === '#' || imgError) && platform === 'instagram';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      whileHover={!isActive ? { y: -5, transition: { duration: 0.3, ease: "easeOut" } } : {}}
      className={`relative rounded-xl overflow-hidden cursor-pointer border border-white/5 shadow-lg bg-gray-900 group ${
        aspectRatio === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {/* If revealed, we show the player (or persistent iframe) */}
      {isRevealed ? (
        <div className="relative w-full h-full bg-black z-20">
             {platform === 'youtube' && youtubeId ? (
                <iframe
                  id={iframeId}
                  width="100%"
                  height="100%"
                  // enablejsapi=1 is crucial for the YT Player API to work
                  src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=1&rel=0&modestbranding=1&controls=1`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
             ) : platform === 'instagram' && instagramId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.instagram.com/p/${instagramId}/embed/`}
                  title={item.title}
                  allow="encrypted-media"
                  allowFullScreen
                  className="w-full h-full bg-black"
                  scrolling="no"
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-white">Video Unavailable</div>
             )}
            
            {/* Maximize Button - Only show when revealed */}
            <button
              onClick={handleExpandClick}
              className="absolute top-2 right-2 p-2 bg-black/60 text-white rounded-full hover:bg-brand-primary transition-colors backdrop-blur-md z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              title="Maximize"
            >
              <Maximize2 size={16} />
            </button>
        </div>
      ) : (
        <div onClick={handlePlayClick} className="w-full h-full relative z-10">
           {/* Thumbnail Logic */}
           {showCustomPlaceholder ? (
             <div className="w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex flex-col items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <Instagram size={48} className="text-white mb-2" />
                <span className="text-white font-bold text-sm uppercase tracking-wider">View on Instagram</span>
             </div>
           ) : (
             <img
              src={thumbnail}
              alt={item.title}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
           )}

          {/* Overlay Gradient (Only if not using the solid placeholder) */}
          {!showCustomPlaceholder && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
          )}

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 bg-brand-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(99,102,241,0.5)] transform scale-95 group-hover:scale-100 transition-transform duration-300">
              <Play size={24} className="ml-1 text-white fill-white" />
            </div>
          </div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none">
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