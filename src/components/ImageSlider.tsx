import { useState, useEffect } from 'react';

// Array of gym images
const gymImages = [
  '/images/gym1enhance.webp',
  '/images/gym2enhance.webp',
  '/images/gym3enhance.jpg',
  '/images/gym4.jpg',
];

const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize image load status
    setImagesLoaded(new Array(gymImages.length).fill(false));

    // Preload images for smoother transitions
    gymImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === gymImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Images */}
      {gymImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={src}
            alt={`Gym background ${index + 1}`}
            className={`absolute w-full h-full object-cover scale-[1.01] ${imagesLoaded[index] ? 'filter-none' : 'blur-sm'}`}
            style={{ 
              objectPosition: 'center',
              display: 'block',
              willChange: 'transform', // Hardware acceleration hint
              imageRendering: 'crisp-edges', // Improve image sharpness
            }}
            loading="eager"
          />
          {/* Gradient overlay for better text contrast while preserving image visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 z-20"></div>
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {gymImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentImage === index 
                ? 'bg-white scale-110' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 