import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MailOpen, Sparkles, User } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  guestName: string;
}

export default function Envelope({ onOpen, guestName }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Play a gentle subtle opening transition, then call onOpen
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-100 overflow-hidden px-4">
      {/* Abstract Elegant background with subtle sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-50/40 via-stone-100 to-amber-100/20" />
      
      {/* Decorative floral silhouette background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03] select-none text-[32vw] font-serif">
        囍
      </div>

      <AnimatePresence>
        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -100 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-amber-200/50 bg-white p-6 shadow-2xl md:p-8"
          >
            {/* Elegant double border */}
            <div className="absolute inset-2 rounded-xl border border-amber-200/30 pointer-events-none" />
            <div className="absolute inset-3 rounded-lg border border-dashed border-amber-200/20 pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-amber-300/40" />
            <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-amber-300/40" />
            <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-amber-300/40" />
            <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-amber-300/40" />

            <div className="flex flex-col items-center text-center">
              {/* Double Happiness Icon or Elegant Lettering */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl text-amber-600 font-serif shadow-inner border border-amber-100"
              >
                囍
              </motion.div>

              <span className="font-serif text-sm tracking-[0.25em] text-amber-600 uppercase mb-1">
                Wedding Invitation
              </span>
              
              <h2 className="font-serif text-3xl font-light text-stone-800 tracking-wide mt-2">
                Duy Anh <span className="text-amber-500 font-sans font-light text-2xl">&amp;</span> Thanh Bình
              </h2>

              <div className="my-6 h-[1px] w-32 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

              {/* Guest name block */}
              <div className="mb-8 w-full rounded-xl bg-stone-50/80 px-6 py-5 border border-stone-100 shadow-sm relative">
                <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mb-2">
                  Trân trọng kính mời
                </p>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User className="h-4 w-4 text-amber-500/80" />
                  <span className="font-serif text-2xl font-medium text-stone-800 text-amber-700">
                    {guestName}
                  </span>
                </div>
                <p className="font-sans text-xs text-stone-500 leading-relaxed max-w-xs mx-auto">
                  Đến dự buổi tiệc chung vui cùng gia đình chúng tôi tại ngày trọng đại thành hôn.
                </p>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpen}
                className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3.5 text-white shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <MailOpen className="h-5 w-5 transition-transform group-hover:rotate-6" />
                <span className="font-serif tracking-wider font-light text-sm">
                  Mở Thiệp Cưới
                </span>
                <Heart className="h-4 w-4 text-red-100 fill-red-200 animate-pulse ml-1" />
              </motion.button>

              <div className="mt-6 flex items-center gap-1.5 text-stone-400 text-xs font-sans">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Nhạc nền sẽ phát tự động sau khi mở</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
