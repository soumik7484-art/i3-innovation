import { useState, useEffect } from 'react';

export default function ImageGallery({ images = [], productName = 'Product' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [failedImages, setFailedImages] = useState(new Set());

  // Reset when images change
  useEffect(() => {
    setCurrentIndex(0);
    setFailedImages(new Set());
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square md:aspect-[4/3] bg-brown-50 flex items-center justify-center rounded-2xl border border-brown-100">
        <span className="text-brown-400 font-medium">No images available</span>
      </div>
    );
  }

  const handleImageError = (index) => {
    setFailedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div 
        className="relative aspect-square md:aspect-[4/3] bg-white border border-brown-100 rounded-2xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-md transition-shadow group"
        onClick={() => setIsLightboxOpen(true)}
      >
        {failedImages.has(currentIndex) ? (
          <div className="w-full h-full flex items-center justify-center bg-brown-50 text-brown-400">
            Image unavailable
          </div>
        ) : (
          <img
            src={images[currentIndex]}
            alt={`${productName} - View ${currentIndex + 1}`}
            className="w-full h-full object-contain"
            onError={() => handleImageError(currentIndex)}
          />
        )}
        
        {/* Navigation Overlays (visible on hover) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-brown-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-brown-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white focus:outline-none"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                currentIndex === idx ? 'border-brown-600 shadow-sm' : 'border-transparent hover:border-brown-300 opacity-70 hover:opacity-100'
              }`}
            >
              {failedImages.has(idx) ? (
                <div className="w-full h-full bg-brown-50 flex items-center justify-center text-[10px] text-brown-400 text-center p-1">
                  Unavailable
                </div>
              ) : (
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(idx)}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-50 focus:outline-none"
            aria-label="Close fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4">
            {images.length > 1 && (
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-50 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}

            {failedImages.has(currentIndex) ? (
              <div className="text-white/50 text-xl">Image unavailable</div>
            ) : (
              <img
                src={images[currentIndex]}
                alt={`${productName} - Fullscreen`}
                className="max-w-full max-h-full object-contain select-none"
              />
            )}

            {images.length > 1 && (
              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 w-12 h-12 rounded-full flex items-center justify-center transition-colors z-50 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}
            
            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white/90 px-4 py-2 rounded-full text-sm font-medium tracking-wide">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
