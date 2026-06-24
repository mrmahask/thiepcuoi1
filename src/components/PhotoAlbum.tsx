import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Photo } from '../types';

interface PhotoAlbumProps {
  photos: Photo[];
}

export default function PhotoAlbum({ photos }: PhotoAlbumProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="px-4">
      <div className="text-center max-w-md mx-auto mb-10">
        <span className="font-serif text-xs tracking-widest text-amber-600 uppercase">
          Wedding Gallery
        </span>
        <h3 className="font-serif text-3xl font-light text-stone-800 mt-2">
          Album Ảnh Cưới
        </h3>
        <div className="mt-2 h-[1px] w-16 bg-amber-300 mx-auto" />
      </div>

      {/* Grid gallery */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 max-w-5xl mx-auto space-y-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => setActivePhotoIndex(index)}
            className="group relative overflow-hidden rounded-2xl border border-stone-100 shadow-sm cursor-pointer break-inside-avoid transform transition-transform duration-500 hover:scale-[1.02]"
          >
            <img
              src={photo.url}
              alt={photo.caption || `Wedding Photo ${index + 1}`}
              referrerPolicy="no-referrer"
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-stone-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="rounded-full bg-white/80 p-3 shadow-md backdrop-blur-sm text-stone-800 scale-90 group-hover:scale-100 transition-all duration-300">
                <ZoomIn className="h-5 w-5" />
              </div>
            </div>
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/60 to-transparent p-4 text-white">
                <p className="font-serif text-xs tracking-wider italic font-light">
                  {photo.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-sm p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-all"
            title="Đóng"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation - Left */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all active:scale-95 z-10"
            title="Ảnh trước"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image slide */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activePhotoIndex].url}
              alt={photos[activePhotoIndex].caption || 'Wedding Photo'}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-fade-in"
            />
            {photos[activePhotoIndex].caption && (
              <p className="mt-4 font-serif text-stone-300 text-sm italic tracking-wider">
                {photos[activePhotoIndex].caption}
              </p>
            )}
            {/* Index indicator */}
            <span className="mt-2 text-stone-500 text-xs font-mono">
              {activePhotoIndex + 1} / {photos.length}
            </span>
          </div>

          {/* Navigation - Right */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all active:scale-95 z-10"
            title="Ảnh tiếp"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
