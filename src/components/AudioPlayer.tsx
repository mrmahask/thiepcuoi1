import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  isPlayingMusic: boolean;
  setIsPlayingMusic: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlayingMusic, setIsPlayingMusic }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasError, setHasError] = useState(false);

  // Use a soft, elegant royalty-free acoustic romance piano music track
  const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'; // safe backup track

  useEffect(() => {
    // We use a beautiful piano melody from a stable public resource
    // Alternatively, we can use a beautiful royalty-free track
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlayingMusic) {
      audioRef.current.play().catch((err) => {
        console.log('Autoplay prevented or failed:', err);
        setIsPlayingMusic(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic, setIsPlayingMusic]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <button
        onClick={togglePlay}
        id="audio-toggle-btn"
        className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/50 bg-white/85 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
          isPlayingMusic ? 'text-amber-600 ring-2 ring-amber-500/20' : 'text-stone-400'
        }`}
        title={isPlayingMusic ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {isPlayingMusic ? (
          <>
            <Volume2 className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
            </span>
            {/* Tiny animated floating notes */}
            <div className="absolute -top-6 left-0 animate-bounce text-stone-500 opacity-60">
              <Music className="h-3 w-3" />
            </div>
          </>
        ) : (
          <VolumeX className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
