import React, { useState, useEffect, useRef, memo } from 'react';
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

// Optimization: Memoize the component to prevent unnecessary re-renders
export const VideoCard: React.FC<VideoCardProps> = memo(({ item, isActive, onPlay, onExpand, aspectRatio }) => {
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
  const [isRevealed, setIsRevealed] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeId = `yt-player-${item.id}`;

  useEffect(() => {
    setImgError(false);
    if (item.thumbnailUrl && item.thumbnailUrl !== '#' && item.thumbnailUrl.trim() !== '') {
      setThumbnail(item.thumbnailUrl);
      return;
    }
    if (platform === 'youtube' && youtubeId) {
      setThumbnail(`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`);
    } else {
      setThumbnail(''); 
    }
  }, [item.thumbnailUrl, youtubeId, platform]);

  const handleImageError = () => {
    if (platform === 'youtube' && youtubeId && !thumbnail.includes('hqdefault')) {
      setThumbnail(`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`);
    } else {
      setImgError(true);
    }
  };

  useEffect(() => {
    if (isRevealed && platform === 'youtube' && youtubeId) {
      const initPlayer = () => {
        if (window.YT && window.YT.Player) {
           playerRef.current = new window.YT.Player(iframeId, {
            events: {
              'onReady': (event: any) => {
                if (isActive) event.target.playVideo();
              }
            }
          });
        }
      };

      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        const checkYT = setInterval(() => {
           if (window.YT && window.YT.Player) {
             clearInterval(checkYT);
             initPlayer();
           }
        }, 100);
        return () => clearInterval(checkYT);
      }
    }
    return () => {
       if (playerRef.current && playerRef.current.destroy) {
         try { playerRef.current.destroy(); } catch(e) {}
         playerRef.current = null;
       }
    };
  }, [isRevealed, platform, youtubeId, iframeId]); 

  useEffect(() => {
    if (platform === 'youtube' && playerRef.current && playerRef.current.playVideo) {
      try {
        const playerState = playerRef.current.getPlayerState();
        if (isActive) {
           if (playerState !== 1 && playerState !== 3) playerRef.current.playVideo();
        } else {
           if (playerState === 1 || playerState === 3) playerRef.current.pauseVideo();
        }
      } catch (e) {}
    }
  }, [isActive, platform]);

  const handlePlayClick = () => {
    setIsRevealed(true);
    onPlay();
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    let startTime = 0;
    if (platform === 'youtube' && playerRef.current && playerRef.current.getCurrentTime) {
      try { startTime = playerRef.current.getCurrentTime(); } catch (err) {}
    }
    onExpand(startTime);
  };

  const showCustomPlaceholder = (thumbnail === '' || thumbnail === '#' || imgError) && platform === 'instagram';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      data-cursor="video"
      className={`glass-card rounded-[20px] overflow-hidden cursor-pointer group relative ${
        aspectRatio === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {/* Selection Glow */}
      {isActive && (
         <div className="absolute inset-0 border-2 border-accent-purple/50 rounded-[20px] z-30 pointer-events-none box-border" />
      )}

      {isRevealed ? (
        <div className="relative w-full h-full bg-black z-20">
             {platform === 'youtube' && youtubeId ? (
                <iframe
                  id={iframeId}
                  width="100%"
                  height="100%"
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
            
            <button
              onClick={handleExpandClick}
              className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-accent-purple transition-colors backdrop-blur-md z-20 opacity-0 group-hover:opacity-100"
            >
              <Maximize2 size={16} />
            </button>
        </div>
      ) : (
        <div onClick={handlePlayClick} className="w-full h-full relative z-10 group-hover:scale-105 transition-transform duration-700">
           {showCustomPlaceholder ? (
             <div className="w-full h-full bg-gradient-to-br from-purple-900 via-bg-secondary to-black flex flex-col items-center justify-center">
                <Instagram size={48} className="text-white mb-2 opacity-80" />
                <span className="text-white font-bold text-sm uppercase tracking-wider opacity-80">Instagram Reel</span>
             </div>
           ) : (
             <img
              src={thumbnail}
              alt={item.title}
              onError={handleImageError}
              loading="lazy" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
           )}

          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-glow-purple">
              <Play size={28} className="ml-1 text-white fill-white" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-base font-bold text-white mb-1 leading-tight line-clamp-2 font-display">{item.title}</h3>
                   {item.views && <p className="text-xs text-accent-purple font-medium">{item.views} Views</p>}
                </div>
             </div>
          </div>
        </div>
      )}
    </motion.div>
  );
  
});