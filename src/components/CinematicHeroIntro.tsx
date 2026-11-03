import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

interface CinematicHeroIntroProps {
  onComplete: () => void;
  videoSrc?: string;
}

export const CinematicHeroIntro: React.FC<CinematicHeroIntroProps> = ({
  onComplete,
  videoSrc = '/assets/aistudio/UFO_flying_and_landing_313a22aa_dd605a55.mp4'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Attempt auto-play immediately
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        setHasStarted(true);
      }).catch(() => {
        // Fallback if browser requires interaction
        setHasStarted(true);
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen bg-black overflow-hidden flex items-center justify-center select-none cursor-default">
      {/* Absolute full-screen video with zero UI overlays in the center */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={onComplete}
        className="w-full h-full object-cover md:object-cover"
      />

      {/* Subtle corner affordance for skip / sound strictly in the extreme bottom corner */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-colors text-xs"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          title={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onComplete}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md border border-white/10 transition-colors text-xs font-mono tracking-wider uppercase"
        >
          <span>Enter Fest Hub</span>
          <FastForward className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    </div>
  );
};
