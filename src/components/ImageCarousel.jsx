import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageCarousel = ({ images = [], alt = 'Service Image', height = '240px', autoPlayInterval = 3500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [images, autoPlayInterval, isPaused]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      style={{ position: 'relative', height, width: '100%', overflow: 'hidden', borderRadius: 'inherit' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Current Image */}
      <img 
        key={currentIndex}
        src={images[currentIndex]} 
        alt={`${alt} ${currentIndex + 1}`} 
        className="animate-fade-in"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Navigation Arrows (Only if multiple images) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            aria-label="Image précédente"
            style={{
              position: 'absolute', top: '50%', left: '0.5rem', transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.45)', color: 'white', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              backdropFilter: 'blur(4px)', transition: 'background 0.2s ease', zIndex: 3
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            onClick={handleNext}
            aria-label="Image suivante"
            style={{
              position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.45)', color: 'white', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              backdropFilter: 'blur(4px)', transition: 'background 0.2s ease', zIndex: 3
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div style={{
            position: 'absolute', bottom: '0.6rem', left: 0, right: 0,
            display: 'flex', justifyContent: 'center', gap: '0.35rem', zIndex: 3
          }}>
            {images.map((_, idx) => (
              <span 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                style={{
                  width: currentIndex === idx ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: currentIndex === idx ? 'var(--bright-lime)' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
