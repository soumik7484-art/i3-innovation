import React, { useState, useMemo, useEffect } from 'react';
import products from '../data/products.json';

const PhotosPage = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Collect first image from each product
  const galleryImages = useMemo(() => {
    return products
      .filter(p => p.images && p.images.length > 0)
      .map(p => ({
        url: p.images[0],
        title: p.name,
        productId: p.id
      }));
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    if (lightboxIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };
  
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3B2C24] mb-4">Product Gallery</h1>
          <p className="text-lg text-[#5C4A40]">Explore our extensive collection</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map((image, idx) => (
            <div 
              key={`${image.productId}-${idx}`}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square bg-[#E8E1D9]"
              onClick={() => openLightbox(idx)}
            >
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium truncate w-full">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50 p-2"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full"
            onClick={prevImage}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <img 
              src={galleryImages[lightboxIndex].url} 
              alt={galleryImages[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <p className="text-white text-lg mt-4 text-center bg-black/50 px-4 py-2 rounded-full w-auto inline-block">
              {galleryImages[lightboxIndex].title}
            </p>
          </div>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-50 p-2 bg-black/50 rounded-full"
            onClick={nextImage}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotosPage;
